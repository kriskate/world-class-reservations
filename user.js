




/* --- USER --- */
const getUserID = async () => {
  const mainPage = await fetch('https://members.worldclass.ro/dashboard.php',
    { method: "GET", credentials: "same-origin"}
  ).then(res => res.text()).then(res => res)
  const mainPageEl = document.createElement("DIV")
  mainPageEl.innerHTML = mainPage
  console.log(mainPageEl.querySelector("#cardz-user").querySelector('li').textContent.trim())
}