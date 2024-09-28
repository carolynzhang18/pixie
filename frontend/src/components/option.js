export default function Option({ title, values, onAppend }) {
    return (
      <div className="option-section"> {}
        <h3 className="option-title">{title}</h3> {}
        <div className="grid-flow-row">
          {values.map((value) => {
            return (
              <button
                key={value}
                onClick={() => {
                  onAppend(value);
                }}
                className="option-button"
              >
                {value}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
  