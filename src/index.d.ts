type ICampaignEventBody = {
  idCampaignAction?: string;
  idMktRuler?: string;
  contactList: Array<{ [key: string]: string }>;
};
