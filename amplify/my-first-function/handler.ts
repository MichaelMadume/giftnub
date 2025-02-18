export const handler = async (event: any) => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "Hello from my first function!",
      timestamp: new Date().toISOString(),
      event: event
    })
  };
};
