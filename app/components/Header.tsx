export default function Header() {
  return (
    <header className="bg-[#030C26] shadow-md">
      <div className="py-3 px-6 flex items-center justify-start">
        <h1
          className="text-2xl font-bold tracking-widest"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            color: '#05DBF2',
            textShadow: '0 0 16px rgba(5, 219, 242, 0.4)',
          }}
        >
          AutoAction
        </h1>
      </div>
      <div
        className="h-[4px] w-full"
        style={{
          background: 'linear-gradient(to right, #344459, #0583F2, #05AFF2, #05DBF2)',
        }}
      />
    </header>
  );
}
