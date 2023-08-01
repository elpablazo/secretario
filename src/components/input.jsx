export default function Input({ label, placeholder, name, value, onChange }) {
  return (
    <div className="w-full flex flex-col gap-2">
      <label className="px-2 font-medium" htmlFor="roomName">
        {label}
      </label>
      <input
        name={name}
        className="rounded"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
