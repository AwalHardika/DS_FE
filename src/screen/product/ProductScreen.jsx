import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Image, Table } from "antd";
import React, { useState } from "react";
import ax from "../../utils/ax";
import { NavLink } from "react-router-dom";

const ProductScreen = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRow) => {
    setSelectedRowKeys(newSelectedRow);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const {
    data: DataProduct,
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getProduct"],
    queryFn: async () => {
      try {
        const result = await ax.get("/products");

        return result.data.map((e, index) => ({
          ...e,
          no: index + 1,
        }));
      } catch (error) {
        console.log(error);
      }
    },
  });

  const column = [
    {
      title: "No",
      dataIndex: "no",
    },
    {
      title: "Nama Product",
      dataIndex: "nama",
    },
    {
      title: "Harga",
      dataIndex: "harga",
    },
    {
      title: "Deskripsi",
      dataIndex: "deskripsi",
    },
    {
      title: "Image Product",
      dataIndex: "imgProduct",
      render: (e, record) => (
        <Image
          src={`http://localhost:3000/images/product/${e}`}
          width={80}
          height={80}
        />
      ),
    },
    {
      title: "Action",
    },
  ];

  const queryClient = useQueryClient()
  
  const deleteMany = useMutation({
    mutationFn: async (ids) => {
      const result = await ax.delete("/product/delete", {
        data : {
          ids
        }
      });
      return result;
    },
    onSuccess: (res) => {
      refetch()
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function handleMultipleDelete() {
    deleteMany.mutate(selectedRowKeys)
  }

  return (
    <div>
      <div className="mt-4">
        <Button danger type="primary" onClick={handleMultipleDelete}>
          Delete
        </Button>
        <NavLink to={"/product/add"} className={"ml-auto"}>
          <Button>Add Data</Button>
        </NavLink>
        <Table
          columns={column}
          rowSelection={rowSelection}
          dataSource={DataProduct}
          rowKey={"id"}
        />
      </div>
    </div>
  );
};

export default ProductScreen;
