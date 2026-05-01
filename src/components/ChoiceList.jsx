export function ChoiceList({ options, selected, disabled, onSelect }) {
  return (
    <div className="choice-list">
      {options.map((option) => (
        <button
          className={`choice-button ${selected === option ? "is-selected" : ""}`}
          disabled={disabled}
          key={option}
          onClick={() => onSelect(option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  );
}
