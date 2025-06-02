// BEGIN
const companiesButtons = (companies) => {
    const state = {
        description: "",
    }
    const divContainer = document.querySelector(".container");
    const divDescription = document.createElement("div");
    divContainer.appendChild(divDescription);
    companies.forEach(company => {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-primary");
        button.appendChild(new Text(company.name));
        divContainer.appendChild(button);
        button.addEventListener("click", () => {
            if (state.description === "" || state.description !== company.description) {
                state.description = company.description;
                divDescription.innerHTML = company.description;
            }
            else {
                state.description = "";
                divDescription.innerHTML = "";
            }
        })
    })
}
export default companiesButtons;
// END