import { useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import {baseUrl} from '../../baseUrl'

const CreateCategory = ({ categoryId, categoryName }) => {
  const [subCategories,setSubcategories]=useState([{
      subcategory_id:"",subcategory_name:""
    }])
  const [formData, setFormData] = useState({
    category_id: categoryId || "",
    category_name: categoryName || "",
  });
  const navigate=useNavigate()


  const handleAddSubCategory=()=>{
    return setSubcategories([...subCategories,{
      subcategory_id:"",subcategory_name:""
    }])
  }
 
  const handleSubCategoryChange=(index,field,value)=>{
    
     const newSubCategories=[...subCategories]
     newSubCategories[index][field]=value
     setSubcategories(newSubCategories)
  }
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithSubcategories={
        category_id:formData.category_id,
        category_name:formData.category_name,
        subcategories:subCategories
      }
      const { data } = await axios.post(
        `${baseUrl}/api/categories/create-category`,
        formDataWithSubcategories
      );
      if (data?.success) {
        toast.success(`${formData.category_name} is added`);
        setFormData({
          category_id: "",
          category_name: "",
        });
        setSubcategories([{
      subcategory_id:"",subcategory_name:""
    }])
       navigate('/admin/manage-category')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  };

  return (
    <Layout title={"Dashboard-Create Category"}>
      <br></br>
      <div className= "container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 style={{'padding-left':'18rem','font-weight':'bold'}}>Create Category</h1>
            <br></br>
            <form onSubmit={handleSubmit} style={{'margin-left':'15rem'}}>
              <div className="form-group text-left">
                <label htmlFor="category_id" style={{'font-weight':'bold'}}>Category ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="category_id"
                  name="category_id"
                  placeholder="Enter category id"
                  value={formData.category_id}
                  onChange={handleChange}
                  style={{'width':'25rem','border':'2px solid #111'}}
                />
              </div>
              <br></br>
              <div className="form-group text-left">
                <label htmlFor="category_name" style={{'font-weight':'bold'}}>Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="category_name"
                  name="category_name"
                  placeholder="Enter category name"
                  value={formData.category_name}
                  onChange={handleChange}
                   style={{'width':'25rem','border':'2px solid #111'}}
                />
              </div>
              <br></br>
              {subCategories.map((subcat,index)=>{
                return (
                  <>
                    <div className="form-group text-left">
                    <label style={{'font-weight':'bold'}}>{`Subcategory id ${index+1}`}</label>
                    <input
                    type="text"
                    className="form-control"
                    name="subcategory_id"
                    placeholder="Enter subcategory id"
                    value={subCategories[index].subcategory_id}
                    onChange={(e)=>{handleSubCategoryChange(index,"subcategory_id",e.target.value)}}
                     style={{'width':'25rem','border':'2px solid #111'}}
                    />
                    </div>
                    <br></br>
                    <div className="form-group text-left">
                    <label style={{'font-weight':'bold'}}>{`Subcategory name ${index+1}`}</label>
                    <input
                    type="text"
                    className="form-control"
                    name="subcategory_name"
                    placeholder="Enter subcategory name"
                    value={subCategories[index].subcategory_name}
                    onChange={(e)=>{handleSubCategoryChange(index,"subcategory_name",e.target.value)}}
                     style={{'width':'25rem','border':'2px solid #111'}}
                    />
                    </div>
                    <br></br>
                  </>
                )
              })}
              
              <button className="btn btn-primary" onClick={handleAddSubCategory}
              style={{'font-weight':'bold'}}>Create sub category</button>
               <br></br>
               <br></br>

              <button type="submit" className="btn btn-success" style={{'font-size':'1.5rem','width':'25rem','font-weight':'bold'}}>
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
      <style jsx>{`
        .form-group text-left {
          padding-top: 50px;
          text-align: center;
        }
        .form-control{
          width:500px
        }
      `}</style>
    </Layout>
  );
};

export default CreateCategory;
