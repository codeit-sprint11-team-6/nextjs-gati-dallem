type Props = {
  message: string;
};

export default function FormErrorBanner({ message }: Props) {
  if (!message) return null;
  return (
    <p
      className={"mb-2 rounded-md bg-red-50 px-3 py-2 text-xs text-red-600"}
      role="alert"
      aria-live="assertive"
    >
      {message}
    </p>
  );
}
