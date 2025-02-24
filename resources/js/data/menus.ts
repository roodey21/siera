import { FileDigit, GalleryVerticalEnd, House, Mails, Pencil, Users2 } from "lucide-react"

const menus = {
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: House,
        roles: ['User', 'Admin', 'Manajer']
      },
      {
        title: "Tulis Surat",
        url: "/dashboard/compose",
        icon: Pencil,
        roles: ['Admin', 'User', 'Manajer']
      },
      {
        title: "Surat Menyurat",
        url: "#",
        icon: Mails,
        items: [
          {
            title: "Surat Masuk",
            url: '/dashboard/inbox',
            roles: ['Admin', 'User', 'Manajer']
          },
          {
            title: "Surat Keluar",
            url: '/dashboard/sent',
            roles: ['Admin', 'User', 'Manajer']
          },
          {
            title: "Disposisi",
            url: "#",
            disabled: true
          },
        ],
      },
      {
        title: "Nomor Surat",
        url: '/dashboard/letter-number',
        icon: FileDigit,
        roles: ['Admin', 'User', 'Manajer']
      },
      {
        title: "Kelola Pengguna",
        url: '/dashboard/users',
        icon: Users2,
        roles: ['Admin']
      }
    ],
}

export default menus;
