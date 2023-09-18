export const sessionsFromPresenterFilters = (presenterIds, sessions) => {
  if (presenterIds && presenterIds.length > 0) {
    return sessions.filter(session =>
      session.presenterIdentifiers.some(id => presenterIds.includes(id))
    )
  }

  return sessions
}
