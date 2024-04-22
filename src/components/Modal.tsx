export default function Modal({ setContactSuccess }: { setContactSuccess: (value: boolean) => void }) {
  return (
    <div className="trainsiton-500 fixed inset-0 z-10 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-75" />
      <div className="relative m-8 bg-[#dddddd;] p-8 shadow-lg">
        <h2 className="rounded-sm text-2xl font-bold tracking-tight text-black">Thank you, we will be in contact soon.</h2>
        <div className="flex  w-full justify-center">
          <button onClick={() => setContactSuccess(false)} className="transition-500 mt-4 rounded-sm border border-gray-500 bg-transparent px-2 py-1 text-gray-500 hover:bg-black hover:text-white">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
