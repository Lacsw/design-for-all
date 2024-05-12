export async function checkResponse(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    return Promise.reject(`Error ${{ data }}`);
  }
}
