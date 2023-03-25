
const getPartnerInfo = (participants, myEmail) => {
  return participants?.find(participant=> participant.email !== myEmail)
}

export default getPartnerInfo ;