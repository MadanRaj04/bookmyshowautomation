const endpoint = "https://production-sfo.browserless.io/chromium/bql";
const token = "2SrR3soUy2fVAHw4ae4864bf00e5efb0fd0d350187dfd7c11";

async function runBookingMutation() {
  const gql = `
  mutation BookSeats {
    goto(url: "https://in.bookmyshow.com/movies/erode/seat-layout/ET00395817/ACAI/5845/20250814", waitUntil: networkIdle) {
      status
    }
    evaluate(content: """
    (async () => {
      const response = await fetch("https://in.bookmyshow.com/api/v2/mobile/booking/movies", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
          'x-region-code': 'EROD',
          'x-region-slug': 'erode',
          'x-latitude': '11.340399',
          'x-longitude': '77.716942',
          'x-bms-id': '1.735942063.1755102313168',
          'x-app-code': 'WEB',
          'x-platform': 'WEB',
          'x-platform-code': 'WEB',
          'Origin': 'https://in.bookmyshow.com',
          'Referer': 'https://in.bookmyshow.com/movies/erode/seat-layout/ET00395817/ACAI/5845/20250814'
        },
        body: JSON.stringify({
          appCode: "WEB",
          venueCode: "ACAI",
          eventCode: "ET00395817",
          sessionId: "5845",
          numberOfTickets: 7,
          ticketCategory: "0004",
          selectedSeats: "|7|0000000003|4|2|041|0000000003|4|2|042|0000000003|4|2|043|0000000003|4|2|044|0000000003|4|1|041|0000000003|4|1|042|0000000003|4|3|042|",
          bmsId: "1.735942063.1755102313168",
          token: "67x1xa33b4x422b361ba",
          seatLayoutType: "Y",
          offerData: { offerSelected: false },
          companyCode: "ASEC"
        })
      });
      return await response.text();
    })()
    """) {
      value
    }
  }`;

  const res = await fetch(`${endpoint}?token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: gql })
  });

  const result = await res.json();
  console.log(result.data.evaluate.value);
}

runBookingMutation().catch(console.error);

