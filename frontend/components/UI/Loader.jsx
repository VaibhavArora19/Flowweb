const Loader = ({ inComp = false }) => {
  return (
    <div
      className={`flex justify-center items-center py-4 ${
        inComp ? 'max-h-screen' : 'h-screen'
      }`}
    >
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-800" />
    </div>
  );
};

export default Loader;