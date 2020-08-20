import generatePackageJson from 'rollup-plugin-generate-package-json'
import { get, deepMerge } from '@ltipton/jsutils'
import path from 'path'

/**
 * Builds a map of dependencies to be installed by the consumer of the exported build.
 * Does so by finding the versions of each dependency in `names` in the tap and core packages.
 * @param {Object} mergedPackage - the result of merging the tap and core's package.json 
 * @param {Array<string>} names - dependency names
 * @param {Object} extra - additional dependencies (with specific versions) to include
 */
const makeDependencyMap = (mergedPackage, names, extra = {}) =>
  names.reduce((map, name) => {
    const version =
      get(mergedPackage, [ 'dependencies', name ]) ||
      get(mergedPackage, [ 'devDependencies', name ]) ||
      get(mergedPackage, [ 'peerDependencies', name ])

    version
      ? (map[name] = version)
      : console.warn(
        'No version found for package',
        name,
        '. Omitting from generated package.json...'
      )

    return map

  }, extra)

/**
 * Generates a package.json file for the export, using the externals and the core and tap package.json files
 * @param {object} params
 * @param {string} params.tapPath - path to tap root
 * @param {string} params.corePath - path to keg-core root
 * @param {Array<string>} params.externals - list of dependency names to be considered external dependencies
 * @param {Array<string>} params.peerExternals - list of dependency names to be considered an external **peer** dependency
 * @param {Object} baseContents - overrides for any property in package.json
 * @param {Object} ...rest - any remaining properties to be passed to the underlying plugin: rollup-plugin-generate-package-json
 */
export default ({ tapPath, corePath, externals=[], peerExternals=[], baseContents={}, ...rest }) => {
  const tapPackage = require(path.join(tapPath, 'package.json'))
  const corePackage = require(path.join(corePath, 'package.json'))

  const mergedPackage = deepMerge(tapPackage, corePackage)

  // for each rollup external, it finds the version for that dependency in the tap or core,
  // returning a full map of those dependencies, to be used in the generated package.json
  const dependencyMap = makeDependencyMap(mergedPackage, externals)
  const peerDependencyMap = makeDependencyMap(mergedPackage, peerExternals)

  return generatePackageJson({
    inputFolder: tapPath,
    baseContents: deepMerge({
      name: tapPackage.name,
      version: tapPackage.version,
      description: tapPackage.description,
      repository: tapPackage.repository,
      license: tapPackage.license,
      author: tapPackage.author,
      dependencies: dependencyMap,
      peerDependencies: peerDependencyMap,
    }, baseContents),
    ...rest,
  })
}
