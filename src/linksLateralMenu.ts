/** @format */

export const linksLateralMenu = [
  {
    text: "Usuarios",
    link: "/usuarios",
    childrens: [
      {
        text: "Ingresar",
        link: "/usuarios/ingresar",
        component: "Home7Tab.tsx"
      },
      {
        text: "Adminsitrar",
        link: "/usuarios/administrar",
        component: "Home2Tab.tsx"
      }
    ]
  },
  {
    text: "Clientes",
    link: "/clientes",
    childrens: [
      {
        text: "Ingresar",
        link: "/clientes/ingresar",
        component: "Home3Tab.tsx"
      },
      {
        text: "Adminsitrar",
        link: "/clientes/administrar",
        component: "Home6Tab.tsx"
      }
    ]
  },
  {
    text: "Usuarios",
    link: "/proveedores",
    childrens: [
      {
        text: "Ingresar",
        link: "/clientes/ingresar",
        component: "Home4Tab.tsx"
      },
      {
        text: "Adminsitrar",
        link: "/proveedores/administrar",
        component: "Home5Tab.tsx"
      }
    ]
  }
];
