export async function convertDataToJson(req, res) {
  req.setEncoding("utf8");

  let data = "";

  for await (const chunk of req) {
    data += chunk;
  }

  try {
    req.body = JSON.parse(data);
  } catch {
    req.body = null;
  }

  res.setHeader("Content-Type", "application/json");
}
