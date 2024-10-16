import { useState } from "react"
import { useNavigate } from "react-router"
import { Search } from "@mui/icons-material"
import { IconButton } from "@mui/material"

export default function SearchBar(){
  const [search,setSearch] = useState("")
  const navigate = useNavigate()

    const updateInput = (e)=>{
        setSearch(e.target.value)
    }
    const handleSearch = ()=>{
      if(search){
        navigate(`/search/${search}`)
      }
    }
    const handleKeyDown = (e) => {
      if(e.key === 'Enter' && search){
        handleSearch();
      }
    };

    return(
        <div id="searchInput">
          <input 
          type="text" 
          value={search} 
          onChange={updateInput} 
          onKeyDown={handleKeyDown}
          name="serach" 
          id="search" 
          placeholder="what are you looking for?"
          />

          <IconButton onClick={handleSearch}>
            <Search/>
          </IconButton>
          
        </div>
    )
}