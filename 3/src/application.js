// BEGIN
const rendering = (laptops) => {
    const state = {
        models: [],
        processor: "",
        memory: "",
        frequencyMin: "",
        frequencyMax: "",
    }
    const filter = () => {
        laptops.forEach((laptop) => {
            if (state.processor === laptop.processor || state.processor === "") {
                if (parseInt(state.memory) === laptop.memory || state.memory === "") {
                    if ((parseInt(state.frequencyMin) <= laptop.frequency
                        && parseInt(state.frequencyMax) >= laptop.frequency)
                        || (state.frequencyMin === ""
                        && parseInt(state.frequencyMax) >= laptop.frequency)
                        || (parseInt(state.frequencyMin) <= laptop.frequency
                        && state.frequencyMax === "") ||
                        (state.frequencyMin === "" && state.frequencyMax === "")) {
                        state.models.push(laptop.model);
                    }
                }
            }
        })
        return state;
    }
    const check = () => {
        const result = document.querySelector(".result");
        result.innerHTML = "";
        if (state.models.length === 0 && state.processor === ""
            && state.memory === "" && state.frequencyMin === "" && state.frequencyMax === "") {
            const ul = document.createElement("ul");
            result.appendChild(ul);
            laptops.forEach((laptop) => {
                const li = document.createElement("li");
                li.textContent = laptop.model;
                ul.appendChild(li);
            })
        }
        if (state.models.length > 0) {
            const ul = document.createElement("ul");
            result.appendChild(ul);
            state.models.forEach((model) => {
                const li = document.createElement("li");
                li.textContent = model;
                ul.appendChild(li);
            })
            state.models = []
        }
    }
    check();
    const processor = document.querySelector("select[name=processor_eq]");
    const memory = document.querySelector("select[name=memory_eq]");
    const frequencyMin = document.querySelector("input[name=frequency_gte]");
    const frequencyMax = document.querySelector("input[name=frequency_lte]");
    state.processor = processor.value;
    state.memory = memory.value;
    state.frequencyMin = frequencyMin.value;
    state.frequencyMax = frequencyMax.value;
    processor.addEventListener("change", () => {
        state.processor = processor.value;
        filter(laptops, state);
        check();
    });
    memory.addEventListener("change", () => {
        state.memory = memory.value;
        filter(laptops, state);
        check();
    });
    frequencyMin.addEventListener("input", () => {
        state.frequencyMin = frequencyMin.value;
        filter(laptops, state);
        check();
    });
    frequencyMax.addEventListener("input", () => {
        state.frequencyMax = frequencyMax.value;
        filter(laptops, state);
        check();
    });
}
export default rendering;
// END