'use server';

const BASE_URL: string = "https://api.colmeia.me/v1/rest";

const email: string = process.env.COLMEIA_EMAIL || "";
const password: string = process.env.COLMEIA_PASSWORD || "";
const idSocialNetwork: string = process.env.COLMEIA_ID_SOCIAL_NETWORK || "";
const idTokenToRefresh: string = process.env.COLMEIA_REFRESH_TOKEN || "";

async function generateToken(): Promise<string> {
  const response = await fetch(`${BASE_URL}/generate-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      idSocialNetwork: `${idSocialNetwork}`,
    },
    body: JSON.stringify({
      idTokenToRefresh: idTokenToRefresh,
      email: email,
      password: password,
      idSocialNetwork: `${idSocialNetwork}`,
    }),
  });

  if (!response.ok) {
    console.error("Error generating token:", await response.json());
    throw new Error(`Error generating token: ${response.statusText}`);
  }

  const data = await response.json();
  return data.token;
}

export async function sendCampaignEvent(body: ICampaignEventBody) {
  const token = await generateToken();
  const result = await fetch(`${BASE_URL}/marketing-send-campaign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
      idSocialNetwork: `${idSocialNetwork}`,
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (!response.ok) {
        console.error("Error in sendCampaignEvent:", response);
        throw new Error(`Error sending campaign event: ${response.statusText}`);
      } else {
        return response.json();
      }
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error("Error in sendCampaignEvent:", error);
      throw error;
    });

  return result;
}
