export default function Input(props) {
  return (
    <>
      <input
        {...props}
        onKeyUp={(e) => {
          e.target.setAttribute("data-value", e.target.value.trim());
        }}
        onBlur={(e) => {
          e.target.value = e.target.value.trim();
        }}
        {...{ "data-value": "" }}
      />
    </>
  );
}
