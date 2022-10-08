import React from "react";

const Forms = ({ template, submitHandler, register, handleSubmit }) => {
  function makeForm({ fields }) {
    return fields.map((field, index) => {
      return (
        <div
          className="flex flex-wrap -mx-3 mb-2"
          key={`${index}-${field.name}`}
        >
          <div className="w-full px-3 mb-6 md:mb-0">
            {initInput(field, register)}
          </div>
        </div>
      );
    });
  }

  return (
    <form className="w-full max-w-lg" onSubmit={handleSubmit(submitHandler)}>
      {makeForm(template)}
      <div className="flex flex-row justify-center">
        <button className="bg-transparent hover:bg-pink-500 text-pink-500 font-semibold hover:text-white py-2 px-4 border border-pink-500 hover:border-transparent rounded">
          Submit
        </button>
      </div>
    </form>
  );
};

function initInput(input, fnRegister) {
  const { tag } = input;
  let field;
  switch (tag) {
    case "select":
      field = (
        <>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor={`grid-${input.name}`}
          >
            {input.labelName}
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              // ref={fnRegister}
              name={input.name}
              {...fnRegister(input.name)}
            >
              {processOptions(input)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </>
      );
      break;
    case "text-area":
      field = (
        <>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor={`grid-last-${input.name}`}
          >
            {input.labelName}
          </label>
          <textarea
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id={`grid-last-${input.name}`}
            name={input.name}
            rows={input.dimensions[0]}
            cols={input.dimensions[1]}
            // ref={fnRegister}
            {...fnRegister(input.name)}
            placeholder="Add a comment about conditions of the phone, was it brought with a case, a battery?"
          />
        </>
      );
      break;
    default:
      field = (
        <>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor={`grid-last-${input.name}`}
          >
            {input.labelName}
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id={`grid-last-${input.name}`}
            type={input.type}
            name={input.name}
            // ref={fnRegister}
            {...fnRegister(input.name)}
            placeholder={`Enter ${input.labelName}`}
          />
        </>
      );
  }
  return field;
}

function processOptions(input) {
  //check if its an array of Objects or strings
  const { choices } = input;
  let optionsArray = [];
  if (typeof choices[0] === "string") {
    optionsArray = choices.map((choice, index) => {
      return (
        <option key={`${choice}-${input.name}`} value={choice}>
          {choice}
        </option>
      );
    });
    return optionsArray;
  }
  for (const choice of choices) {
    const value = Object.hasOwn(choice, "fullName")
      ? choice.fullName
      : `${choice.brand}:${choice.imei}`;
    optionsArray.push(
      <option key={choice.id} value={choice.id}>
        {value}
      </option>
    );
  }

  return optionsArray;
}

export default Forms;
