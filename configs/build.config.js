const path = require('path')
const rootDir = require('app-root-path').path
const { get, deepMerge } = require('@ltipton/jsutils')
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, NODE_ENV, ENV, TAP } = process.env

// Gets the base or tap to be deployed
const deployType = TAP

const awsConfig = {
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
}

/**
 * Setup the build export folder
 *
 * @returns {string} - path where the build should be exported
 */
const getExportPath = (appConf) => {

  // Gets the build path from the app.json
  const exportFolder = get(appConf, [ 'keg', 'paths', 'exportFolder' ])

  if(!exportFolder)
    throw new Error(`Build Failed! No exportFolder path exists at keg.paths.exportFolder in the app.json`)

  // Setup the build export folder
  const folder = exportFolder && path.join(rootDir, exportFolder, deployType)
  return folder
}

/**
 * Default config for settings shared across all ENVs
 * @param {string} exportTo - location where the compiled app should be exported
 * @param {string} s3UploadPath - S3 bucket path, where the export should be uploaded
 *
 * @returns {Object} - default build config
 */
const defaultConfig = exportTo => ({
  paths: {
    // Where the compiled build should be exported
    exportTo,
  },
  aws: {
    profile: 'events-force', // you need to make this profile in your home credentials file
    credentials: { ...awsConfig },
    cloudfront: {
      invalidation: {
        awsDistributionId: '',
        awsInvalidationPath: 'path/in/s3'
      }
    },
    s3: {
      bucket: 'events-force',
      options: {
        useFoldersForFileTypes: false
      }
    },
  },
  commands: {
    build: {
      args: [ 'build' ],
      cmd: 'next'
    },
    export: {
      args: [
        'export',
        '-o', exportTo,
        '--threads', 1,
        '--concurrency', 1
      ],
      cmd: 'next'
    }
  }
})

/**
 * Gets the default config, and merges it with the current ENV config
 * @param {Object} appConf - App.json config from project root
 * @param {string} s3UploadPath - S3 bucket path, where the export should be uploaded
 *
 * @returns {Object} - default build config
 */
module.exports = appConf => {

  const exportTo = getExportPath(appConf)
  
  // ENV specific config settings
  // Used to change things like S3 upload folder
  const config = {
    development: {},
    staging: {},
    qa: {},
    production: {}
  }
  
  // Merge the default config with the ENV config, then return
  return deepMerge(
    defaultConfig(exportTo),
    config[ENV || NODE_ENV || 'development']
  )
}
