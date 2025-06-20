import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChartBarIcon,
  TagIcon,
  ArrowRightOnRectangleIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const location = useLocation();

  const LIST_ITEM_STYLES = "select-none transition-colors duration-300 hover:bg-[#F4EBD0] focus:bg-[#F4EBD0] active:bg-[#F4EBD0] hover:text-[#425951] focus:text-[#425951] active:text-[#425951]";

  const menuItems = [
    {
      name: "Dashboard",
      icon: <HomeIcon className="h-5 w-5" />,
      path: "/dashboard"
    },
    {
      name: "Categories",
      icon: <TagIcon className="h-5 w-5" />,
      path: "/categories"
    },
    {
      name: "Transactions",
      icon: <CurrencyDollarIcon className="h-5 w-5" />,
      path: "/transactions"
    },
    {
      name: "Reports",
      icon: <ChartBarIcon className="h-5 w-5" />,
      path: "/reports"
    },
    {
      name: "Profile",
      icon: <UserCircleIcon className="h-5 w-5" />,
      path: "/profile"
    }
  ];

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] shadow-xl bg-[#667538] mt-10 ml-8">
      <div className="flex flex-col h-full">
        {/* Main Navigation */}
        <div className="flex-1 p-4">
          <List className="space-y-1">
            {menuItems.map((item) => (
              <Link to={item.path} key={item.name}>
                <ListItem
                  selected={location.pathname === item.path}
                  data-selected={location.pathname === item.path}
                  className={`${LIST_ITEM_STYLES} ${location.pathname === item.path ? 'bg-[#F4EBD0] text-[#425951]' : 'text-[#F4EBD0]'} px-4 py-3 rounded-lg`}
                >
                  <ListItemPrefix className="mr-4">
                    {item.icon}
                  </ListItemPrefix>
                  <Typography className="mr-auto font-normal">
                    {item.name}
                  </Typography>
                </ListItem>
              </Link>
            ))}
          </List>
        </div>

        {/* Footer */}
        <div className="p-4">
          <List>
            <Link to="/login">
              <ListItem className={`${LIST_ITEM_STYLES} text-[#F4EBD0] px-4 py-3 rounded-lg`}>
                <ListItemPrefix className="mr-4">
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography className="mr-auto font-normal">
                  Sign Out
                </Typography>
              </ListItem>
            </Link>
          </List>
          <div className="mt-4">
            <Typography variant="small" className="font-medium text-[#F4EBD0] text-center">
              BudgetWise v1.0.0
            </Typography>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar; 