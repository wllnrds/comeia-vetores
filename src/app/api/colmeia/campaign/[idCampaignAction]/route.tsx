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
      contactList:
        body?.leads && Array.isArray(body.leads)
          ? body.leads.map(mapLeadToRdFormat)
          : [],
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

const RD_FIELDS = [
  "id",
  "name",
  "email",
  "company",
  "job_title",
  "personal_phone",
  "mobile_phone",
  "interest",
  "tags",
  "number_conversions",
  "opportunity",
  "lead_stage",
  "fit_score",
  "last_marked_opportunity_date",
  "mobile_phone",
];

function mapLeadToRdFormat(lead: any) {
  const mappedLead: any = {};
  RD_FIELDS.forEach((field) => {
    if (lead[field] !== undefined) {
      mappedLead[field] = lead[field] ? `${lead[field]}` : "-";
    }
  });
  return mappedLead;
}
