export default function Add() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10 bg-slate-900">
      <div className="w-full max-w-lg p-8 text-white rounded-md shadow-md bg-slate-800">
        <h1 className="mb-6 text-3xl font-bold text-center">Add Product</h1>

        <div className="mb-6">
          <button
            type="button"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            + Add Product Image
          </button>
        </div>

        <h2 className="mb-4 text-xl font-semibold">Product Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              className="w-full p-2 text-white border border-gray-600 rounded-md bg-slate-700"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Price</label>
            <input
              type="text"
              placeholder="Enter price"
              className="w-full p-2 text-white border border-gray-600 rounded-md bg-slate-700"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Enter product description"
              className="w-full p-2 text-white border border-gray-600 rounded-md bg-slate-700"
            ></textarea>
          </div>

          <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
