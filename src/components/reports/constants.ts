import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import StoreIcon from "@mui/icons-material/Store";
import KitchenIcon from "@mui/icons-material/Kitchen";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const categoryIcons = {
  grocery: ShoppingCartIcon,
  eating_out: RestaurantIcon,
  snack: LocalCafeIcon,
  drinking: LocalBarIcon,
  convenience: StoreIcon,
  home_cooking: KitchenIcon,
  other: MoreHorizIcon,
};

export const categoryLabels: { [key: string]: string } = {
  grocery: "スーパー",
  eating_out: "外食",
  snack: "間食",
  drinking: "飲み会",
  convenience: "コンビニ",
  home_cooking: "自炊",
  other: "その他",
};
