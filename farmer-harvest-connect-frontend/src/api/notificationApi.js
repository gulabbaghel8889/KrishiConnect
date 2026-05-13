export const fetchNotifications = async (
  token
) => {
  const response = await fetch(
    "http://localhost:5001/api/notifications",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
};