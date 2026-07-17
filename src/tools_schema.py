from pydantic import BaseModel,Field
from typing import Literal,Optional,List

class SearchMenuInput(BaseModel):
    """Input schema for the search menu tool"""
    category: Literal["Burgers", "Wraps", "Pizza", "Appetizers", "Salads", "Desserts"] | None = Field(
        default=None,
        description="Menu category to filter by (e.g., 'Pizza', 'Burgers', 'Desserts')"
    )
    query: Optional[str] = Field(
        default=None,
        description="Search term to match against item name or description"
    )
    max_price: Optional[float] = Field(
        default=None,
        description="Maximum price in dollars (e.g., 6 for items under $6)"
    )
    min_price: Optional[float] = Field(
        default=None,
        description="Minimum price in dollars"
    )
    tags: Literal["popular", "vegetarian","vegan", "healthy","non-vegetarian","vegan-option","spicy"] | None = Field(
        default=None,
        description="List of tags to filter by (e.g., ['vegetarian', 'spicy'])"
    )
    ingredients: Optional[List[str]] = Field(
        default=None,
        description="List of ingredients to include/exclude. Use '+' prefix for include, '-' for exclude"
    )
    allergens: Literal["dairy", "gluten","egg","sesame","peanuts", "soy"] | None = Field(
        default=None,
        description="List of allergens to avoid (items without these allergens)"
    )
    spice_level: Literal["none","mild","medium","hot"] = Field(
        default=None,
        description="Spice level filter ('none', 'mild', 'medium', 'hot')"
    )
    exclude_allergens: bool = Field(
        default=True,
        description="If True, excludes items containing any specified allergens"
    )
    limit: int = Field(
        default=5,
        description="Maximum number of results to return"
    )



class SearchRecommendations(BaseModel):
    """Input schema for the search menu tool"""
    category: Literal["Burgers", "Wraps", "Pizza", "Appetizers", "Salads", "Desserts"] | None = Field(
        default=None,
        description="Menu category to filter by (e.g., 'Pizza', 'Burgers', 'Desserts')"
    )
  
