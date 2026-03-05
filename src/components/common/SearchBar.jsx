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
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../services/supabase/client";

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
  const [debounceTimer, setDebounceTimer] = useState(null);

  // Update local query when context changes
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  const handleSearch = async (query) => {
    const trimmedQuery = query.trim();

    if (trimmedQuery === "") {
      updateSearchQuery("");
      updateSearchResults([]);
      setSearchingStatus(false);
      return;
    }

    updateSearchQuery(trimmedQuery);
    setSearchingStatus(true);

    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .or(
          `title.ilike.%${trimmedQuery}%,instructor.ilike.%${trimmedQuery}%,category.ilike.%${trimmedQuery}%,description.ilike.%${trimmedQuery}%`,
        )
        .order("created_at", { ascending: false });

      if (error) throw error;

      const results = data || [];
      updateSearchResults(results);

      // Navigate to home/dashboard if not already there
      if (location.pathname !== "/" && location.pathname !== "/dashboard") {
        navigate("/");
      }
    } catch (error) {
      console.error("Search error:", error);
      updateSearchResults([]);
    } finally {
      setSearchingStatus(false);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setLocalQuery(newValue);

    // Clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set new timer for debounced search
    const timer = setTimeout(() => {
      handleSearch(newValue);
    }, 500); // 500ms delay

    setDebounceTimer(timer);
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
    setSearchingStatus(false);
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
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
