import { useState, useEffect } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useSearch } from "../../contexts/SearchContext";
import { searchCourses } from "../../services/courseApi";
import { useNavigate, useLocation } from "react-router-dom";

function SearchBar({ variant = "header" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    searchQuery,
    updateSearchQuery,
    updateSearchResults,
    setSearchingStatus,
    isSearching,
  } = useSearch();
  const [localQuery, setLocalQuery] = useState(searchQuery || "");

  // Update local query when context changes
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleSearch = async (query) => {
    const trimmedQuery = query.trim();

    if (trimmedQuery === "") {
      updateSearchQuery("");
      updateSearchResults([]);
      return;
    }

    updateSearchQuery(trimmedQuery);
    setSearchingStatus(true);

    try {
      const results = await searchCourses(trimmedQuery);
      updateSearchResults(results);

      // Don't auto-navigate - let users search from any page
      // Results will show on current page (home or dashboard)
    } catch (error) {
      console.error("Search error:", error);
      updateSearchResults([]);
    } finally {
      setSearchingStatus(false);
    }
  };

  const handleInputChange = (e) => {
    setLocalQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(localQuery);
    }
  };

  const handleClear = () => {
    setLocalQuery("");
    updateSearchQuery("");
    updateSearchResults([]);
  };

  const handleSearchClick = () => {
    handleSearch(localQuery);
  };

  const isHeaderVariant = variant === "header";

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: isHeaderVariant ? { xs: "100%", md: 400 } : "100%",
      }}
    >
      <TextField
        fullWidth
        size={isHeaderVariant ? "small" : "medium"}
        placeholder="Search courses..."
        value={localQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {isSearching ? (
                <CircularProgress size={20} />
              ) : localQuery ? (
                <IconButton size="small" onClick={handleClear} edge="end">
                  <ClearIcon fontSize="small" />
                </IconButton>
              ) : (
                <IconButton
                  size="small"
                  onClick={handleSearchClick}
                  edge="end"
                  color="primary"
                >
                  <SearchIcon fontSize="small" />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
        sx={{
          bgcolor: "background.paper",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "divider",
            },
            "&:hover fieldset": {
              borderColor: "primary.main",
            },
          },
        }}
      />
    </Box>
  );
}

export default SearchBar;
