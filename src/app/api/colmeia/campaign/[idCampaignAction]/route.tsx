import { sendCampaignEvent } from "@/lib/colmeia";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ idCampaignAction: string }> }
) {
  try {
    const { idCampaignAction } = await params;
    const body = await request.json();

    const requestBody: ICampaignEventBody = {
      idCampaignAction,
      contactList: body?.leads && Array.isArray(body.leads) ? body.leads : [],
    };

    if (
      !requestBody.idCampaignAction ||
      !Array.isArray(requestBody.contactList)
    ) {
      return new Response(
        JSON.stringify({
          message:
            "Invalid request body, missing idCampaignAction and contactList",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = await sendCampaignEvent(requestBody)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });

    return new Response(
      JSON.stringify({
        message: "Campaign data received successfully",
        result,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error processing request",
        error,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
