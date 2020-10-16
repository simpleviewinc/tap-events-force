import { useStoreItems } from 'SVHooks/store/useStoreItems'


/**
 * Whether or not to use military time based on the store settings
 * @returns {boolean}
 */
export const useMilitaryTime = () => {
  const { settings } = useStoreItems(['settings'])
  const { timeFormat } = settings?.agendaSettings?.agendaDisplayProperties || {}
  return timeFormat === '24'
}