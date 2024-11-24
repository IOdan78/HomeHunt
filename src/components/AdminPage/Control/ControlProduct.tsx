import React, { useState, useEffect } from "react";

const ControlProduct: React.FC = () => {
  const [pendingProducts, setPendingProducts] = useState<any[]>([]);
  const [approvedProducts, setApprovedProducts] = useState<any[]>([]);

  // Lấy dữ liệu từ MockAPI
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products with status=null (pending)
        const pendingResponse = await fetch("http://homehunt.somee.com/api/post");
        const pendingData = await pendingResponse.json();
  
        // Fetch products with status=true (approved)
        const approvedResponse = await fetch("http://homehunt.somee.com/api/post?status=true");
        const approvedData = await approvedResponse.json();
  
        // Set the states
        setPendingProducts(pendingData);
        setApprovedProducts(approvedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();
  }, []);

  const token = localStorage.getItem("token");

  // Cập nhật trạng thái sản phẩm
const updateProductStatus = async (id: string, status: boolean | null) => {
  try {

    // Prepare the request body with only the status field
    const requestBody = new FormData();
    requestBody.append('Status', String(status));

    const response = await fetch(`https://localhost:7293/api/post/${id}`, {
      method: 'PUT',
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${token}`,
      },
      body: requestBody,
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Failed to update product status');
    }

    // Update the state for pending and approved products based on status
    if (status === true) {
      setPendingProducts((prev) => prev.filter((product) => product.id !== id));
      const approvedProduct = pendingProducts.find((product) => product.id === id);
      if (approvedProduct) setApprovedProducts((prev) => [...prev, { ...approvedProduct, status }]);
    } else {
      setPendingProducts((prev) => prev.filter((product) => product.id !== id));
    }
  } catch (error) {
    console.error('Error updating product status:', error);
  }
};
  return (
    <div className="container">
      {/* Duyệt tin */}
      <section className="mb-5">
        <h2 className="mb-3">Duyệt tin</h2>
        <div className="row">
          {pendingProducts.length > 0 ? (
            pendingProducts.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div className="card">
                  <img
                    src={product.images[0] || "defaultImage.jpg"}
                    className="card-img-top"
                    alt={product.postTitle}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.postTitle}</h5>
                    <p className="card-text">
                      Mô tả: {product.description.slice(0, 50)}...
                    </p>
                    <div className="mt-2">
                      <button
                        className="btn btn-success me-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateProductStatus(product.id, true);
                        }}
                      >
                        Duyệt
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateProductStatus(product.id, false);
                        }}
                      >
                        Từ chối
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Không có sản phẩm nào cần duyệt.</p>
          )}
        </div>
      </section>

      {/* Các tin đã được đăng */}
      <section>
        <h2 className="mb-3">Các tin đã được đăng</h2>
        <div className="row">
          {approvedProducts.length > 0 ? (
            approvedProducts.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div className="card">
                  <img
                    src={product.images[0] || "defaultImage.jpg"}
                    className="card-img-top"
                    alt={product.postTitle}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.postTitle}</h5>
                    <p className="card-text">
                      Mô tả: {product.description.slice(0, 50)}...
                    </p>
                    <p className="card-text">Giá thuê: {product.rentPrice}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Không có sản phẩm nào đã được duyệt.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ControlProduct;
