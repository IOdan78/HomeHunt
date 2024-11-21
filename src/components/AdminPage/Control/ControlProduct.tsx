import React, { useState, useEffect } from "react";

const ControlProduct: React.FC = () => {
  const [pendingProducts, setPendingProducts] = useState<any[]>([]);
  const [approvedProducts, setApprovedProducts] = useState<any[]>([]);

  // Lấy dữ liệu từ MockAPI
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://671ee00e1dfc429919834fc5.mockapi.io/products"
        );
        const data = await response.json();

        // Lọc sản phẩm theo trạng thái
        const pending = data.filter((product: { status: boolean | null }) => product.status === null);
        const approved = data.filter((product: { status: boolean | null }) => product.status === true);

        setPendingProducts(pending);
        setApprovedProducts(approved);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Cập nhật trạng thái sản phẩm
  const updateProductStatus = async (id: number, status: boolean | null) => {
    try {
      await fetch(`https://671ee00e1dfc429919834fc5.mockapi.io/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      // Cập nhật danh sách sản phẩm
      if (status === true) {
        setPendingProducts((prev) => prev.filter((product) => product.id !== id));
        const approvedProduct = pendingProducts.find((product) => product.id === id);
        if (approvedProduct) setApprovedProducts((prev) => [...prev, { ...approvedProduct, status }]);
      } else {
        setPendingProducts((prev) => prev.filter((product) => product.id !== id));
      }
    } catch (error) {
      console.error("Error updating product status:", error);
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
