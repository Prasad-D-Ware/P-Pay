import Button from "./Button";

export default function Users() {
  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        <div className="flex justify-between">
          <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
              <div className="flex flex-col justify-center h-full text-xl">
                P
              </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
              <div>Prasad Ware</div>
            </div>
          </div>

          <div className="flex flex-col justify-center h-ful">
            <Button label={"Send Money"} />
          </div>
        </div>
      </div>
    </>
  );
}
