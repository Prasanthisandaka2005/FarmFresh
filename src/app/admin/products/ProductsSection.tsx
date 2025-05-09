'use client'

import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'

type Product = {
  id: number;
  name: string;
  price: string;
  image_url: string;
}

interface ErrorResponse {
  error: string;
}

const ProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [form, setForm] = useState({ name: '', price: '', image_url: '' })
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)


  useEffect(() => {
    axios.get('/api/admin/products')
      .then(res => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch(() => {
        toast.error('Error fetching products')
        setLoading(false)
      })
  }, [])


const handleDelete = async (id: number) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this product?')
  if (!confirmDelete) return

  try {
    setDeletingId(id)
    await axios.delete(`/api/admin/products/${id}`)
    setProducts(prevProducts => prevProducts.filter(p => p.id !== id))
    toast.success('Product deleted')
  } catch (e) {
    const error = e as AxiosError<ErrorResponse>;
    const message = error?.response?.data?.error || 'Error deleting product';
    toast.error(message);
  } finally {
    setDeletingId(null)
  }
}


  const handleAdd = async () => {
    const { name, price, image_url } = form
    if (!name || !price || !image_url) {
      toast.error('Fill all fields')
      return
    }

    try {
      setIsAdding(true)
      await axios.post('/api/admin/products', form)
      toast.success('Product added')
      setForm({ name: '', price: '', image_url: '' })

      const res = await axios.get('/api/admin/products')
      setProducts(res.data)
    } catch {
      toast.error('Error adding product')
    } finally {
      setIsAdding(false)
    }
  }

  const handleUpdate = async () => {
    if (editProduct) {
      try {
        setIsUpdating(true)
        await axios.put(`/api/admin/products/${editProduct.id}`, {
          name: editProduct.name,
          price: editProduct.price,
          image_url: editProduct.image_url
        })

        toast.success('Product updated')
        setProducts(prev =>
          prev.map(p => p.id === editProduct.id ? editProduct : p)
        )
        setEditProduct(null)
      } catch {
        toast.error('Error updating product')
      } finally {
        setIsUpdating(false)
      }
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <div className="grid grid-cols-4 gap-2 mb-4">
        <input className="border p-2" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="border p-2" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <input className="border p-2" placeholder="Image URL" value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} />
      </div>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleAdd}
        disabled={isAdding}
      >
        {isAdding ? 'Adding...' : 'Add Product'}
      </button>

      <h2 className="text-xl font-bold my-6">All Products</h2>
      {loading ? <p>Loading Products...</p> : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td className="border p-2">{product.id}</td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">₹{product.price}</td>
                <td className="border p-2"><img src={product.image_url} className="h-12 w-12 object-cover" /></td>
                <td className="border p-4 flex gap-2">
                  <button
                    className="bg-red-400 text-white px-2 py-1 rounded disabled:opacity-50"
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id} 
                  >
                    {deletingId === product.id ? 'Deleting...' : 'Delete'}
                  </button>
                  <button
                    className="bg-blue-400 text-white px-2 py-1 rounded"
                    onClick={() => setEditProduct(product)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Modal */}
      {editProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <input
              value={editProduct.name}
              onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
              placeholder="Name"
              className="w-full p-2 border mb-2"
            />
            <input
              value={editProduct.price}
              onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
              placeholder="Price"
              className="w-full p-2 border mb-2"
            />
            <input
              value={editProduct.image_url}
              onChange={(e) => setEditProduct({ ...editProduct, image_url: e.target.value })}
              placeholder="Image URL"
              className="w-full p-2 border mb-4"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setEditProduct(null)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
                disabled={isUpdating}
              >
                {isUpdating ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsSection
