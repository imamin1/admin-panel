import Avatar from "./Avatar";
import SidebarGroupTitle from "./SidebarGroupTitle";
import SidebarItem from "./SidebarItem";

const Index = () => {
  return (
    <section id="sidebar_section">
      <div className="mini_sidebar collapsedd bg-dark h-100">
        <ul className="p-0 m-0">
          <Avatar
            name="محمد امین شیرزاد"
            imagepath={"/assets/images/avatar/admin.jpg"}
          />
          <li
            className="py-1 text-start pe-4 sidebar_menu_item mt-2 active"
            data-section-id="dashboard_section"
          >
            <i className="ms-3 icon fas fa-tachometer-alt text-light"></i>
            <span className="hiddenable no_wrap font_08">داشبورد</span>
          </li>
          {/* <!-- =================================== --> */}
          <SidebarGroupTitle title={"فروشگاه"} />
          <SidebarItem icon={"fas fa-stream"} title={"مدیریت گروه محصول"} />
          <SidebarItem icon={"fas fa-cube"} title={"مدیریت محصول"} />
          <SidebarItem icon={"fas fa-copyright"} title={"مدیریت برندها"} />
          <SidebarItem icon={"fab fa-pagelines"} title={"مدیریت گارانتی ها"} />
          <SidebarItem icon={"fas fa-palette"} title={"مدیریت رنگ ها"} />
          <SidebarItem icon={"fas fa-percentage"} title={"مدیریت تخفیف ها"} />
          {/* <!-- =================================== --> */}
          <SidebarGroupTitle title={"سفارشات و سبد"} />
          <SidebarItem
            icon={"fas fa-shopping-basket"}
            title={"مدیریت سبد ها"}
            sectionId={"manage_cart_section"}
          />
          <SidebarItem
            icon={"fas fa-luggage-cart"}
            title={"مدیریت سفارشات"}
            sectionId={"manage_orders_section"}
          />
          <SidebarItem
            icon={"fas fa-truck-loading"}
            title={"مدیریت نحوه ارسال"}
            sectionId={"manage_deliveries_section"}
          />
          {/* <!-- =================================== --> */}
          <SidebarGroupTitle title={"کاربران و همکاران"} />
          <SidebarItem
            icon={"fas fa-users"}
            title={"مشاهده کاربران"}
            sectionId={"manage_user_section"}
          />
          <SidebarItem
            icon={"fas fa-user-tag"}
            title={"نقش ها"}
            sectionId={"manage_role_section"}
          />
          <SidebarItem
            icon={"fas fa-shield-alt"}
            title={"مجوز ها"}
            sectionId={"manage_permission_section"}
          />
          {/* <!-- =================================== --> */}
          <SidebarGroupTitle title={"ارتباطات"} />
          <SidebarItem
            icon={"fas fa-question-circle"}
            title={"سوال ها"}
            sectionId={"manage_question_section"}
          />
          <SidebarItem
            icon={"fas fa-comment"}
            title={"نظرات"}
            sectionId={"manage_comments_section"}
          />
        </ul>
      </div>
    </section>
  );
};

export default Index;