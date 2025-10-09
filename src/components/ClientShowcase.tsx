import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/shadcn-io/marquee";
import { Play, Pause, Minus, Plus, X } from "lucide-react";
import { useMotionPreference } from "@/hooks/useMotionPreference";

interface Client {
  name: string;
  logo: string;
  alt: string;
  website?: string;
}

// Your requested companies with working logo sources
const clients: Client[] = [
  {
    name: "PostNord",
    logo: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ic2l0ZWhlYWRlci1sb2dvIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMi43cmVtIiBoZWlnaHQ9IjIuNHJlbSIgdmlld0JveD0iMCAwIDE0MS43MyAyNi42NSIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJQb3N0Tm9yZCI+PHBhdGggZD0iTTEwOC44NCwxMy4zNWMwLDYuMzQtNS4xNyw5LTEwLDlTODksMTkuNzYsODksMTMuNjNjMC02LjI4LDUuMDgtOSwxMC05UzEwOC44NCw3LjI1LDEwOC44NCwxMy4zNVptLTYuNTYuMThhMy40LDMuNCwwLDEsMC02LjgsMGEzLjI5LDMuMjksMCwwLDAsMy40MiwzLjQxQTMuMjQsMy4yNCwwLDAsMCwxMDIuMjgsMTMuNTRabS04MywwYzAsNC44My0zLjMyLDguODItOC40OSw4LjgyYTYuNTQsNi41NCwwLDAsMS00LjY1LTEuNTd2NS44NkgwVjUuMTZINi4xN1Y2LjhhNi40Myw2LjQzLDAsMCwxLDUuMTEtMi4xOEMxNi40MSw0LjYyLDE5LjMxLDguNTgsMTkuMzEsMTMuNTRabS02LjUzLDBBMy4yNywzLjI3LDAsMCwwLDkuNCwxMEEzLjI4LDMuMjgsMCwwLDAsNiwxMy41NEEzLjI5LDMuMjksMCwwLDAsOS40LDE2Ljk1QTMuMjQsMy4yNCwwLDAsMCwxMi43OCwxMy41NFptMTAzLjY5LDAuMjdjMC0yLjU0LDEuNTQtMy4zMiwzLjYtMy4zMmE2LjU2LDYuNTYsMCwwLDEsMi4wOC4zTDEyMi4zLDUuMWEzLjkyLDMuOTIsMCwwLDAtMS40NS0uMThjLTMuNDUsMC00LjM4LDIuMTgtNC4zOCwyLjE4VjUuMTZIMTEwLjNWMjEuODRoNi4xN3YtOFpNMTQxLjczLDBWMjEuODRoLTYuMTZWMjAuMjFhNi40Myw2LjQzLDAsMCwxLTUuMTEsMi4xOGMtNS4xNCwwLTgtNC04LTguOTFzMy4zMi04LjgyLDguNDktOC44MmE2LjU0LDYuNTQsMCwwLDEsNC42NSwxLjU3di01Wm0tNiwxMy40OGEzLjI4LDMuMjgsMCwwLDAtMy40MS0zLjQxQTMuMjQsMy4yNCwwLDAsMCwxMjksMTMuNDdBMy40LDMuNCwwLDEsMCwxMzUuNzUsMTMuNDdaTTgxLjM1LDQuNjJjLTMuNiwwLTQuOSwyLjE4LTQuOSwyLjE4VjUuMTZINzAuMjlWMjEuODRoNi4xNlYxMy4yOWMwLTIuMTEuNzktMy4wOCwyLjY5LTMuMDhzMi4xOCwxLjU3LDIuMTgsMy41N3Y4LjA3aDYuMjJWMTEuNkM4Ny41NSw3LDg1LjM0LDQuNjIsODEuMzUsNC42MlpNNjQuMDcsMS40Mkg1Ny45VjIxLjg0aDYuMTZWMTAuMzZINjdsMi44MS01LjJINjQuMDdWMS40MlpNNTAuMjYsMTEuMjFjLTItLjMtMi44Ny0wLjMtMi44Ny0xLjA5czAuODEtLjk0LDIuNDItLjk0YTE2LjE1LDE2LjE1LDAsMCwxLDUuMTEuOTFMNTYsNS40MWEyNC41NiwyNC41NiwwLDAsMC02LjEzLS43NWMtNS44OSwwLTksMi4yNy05LDUuODksMCwyLjgxLDEuNjYsNC40Nyw2LjUzLDUuMTEsMi4wNiwwLjI3LDIuODEuMzktMi44MSwxLjE1cy0wLjgyLDEtMi4yNCwxYTE2LjY3LDE2LjY3LDAsMCwxLTYtMS4zTDQwLjc3LDIxLjNhMjIuMTQsMjIuMTQsMCwwLDAsNi42OCwxYzYuMzUsMCw5LjI4LTIuMjQsOS4yOC01Ljg5QzU2LjcyLDEzLjU0LDU1LjE1LDEyLDUwLjI2LDExLjIxWk00MC4xOSwxMy4zNWMwLDYuMzQtNS4xNyw5LTEwLDlzLTkuODItMi42LTkuODItOC43M2MwLTYuMjgsNS4wOC05LDEwLTlTNDAuMTksNy4yNSw0MC4xOSwxMy4zNVptLTYuNTYuMThhMy40LDMuNCwwLDEsMC02LjgsMGEzLjI4LDMuMjgsMCwwLDAsMy40MSwzLjQxQTMuMjQsMy4yNCwwLDAsMCwzMy42MywxMy41NFoiIGZpbGw9IiMwMEEwRDYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMCkiPjwvcGF0aD48L3N2Zz4=",
    alt: "PostNord",
    website: "https://postnord.com"
  },
  {
    name: "SJ",
    logo: "data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0iZmFsc2UiIGZpbGw9Im5vbmUiIGZvY3VzYWJsZT0iZmFsc2UiIHZpZXdCb3g9IjAgMCA5NiA2NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWw9IlNKIGxvZ290eXAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHdpZHRoPSI3LjVyZW0iIGhlaWdodD0iNXJlbSI+PHBhdGggY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNjMuMDgzIDIyLjIzMmMtMS4wMTkgNi45MTQtNy4yOTIgNy4yMjEtMTEuNDkgNi45OTQtLjI5Ni0uMDE1LS42MDctLjA2Ny0uODU3LS4wOTYtLjM5My0uMDQ2LS40MjQtLjQ4Mi0uMDg0LS42MjYuODUyLS4zNjMgNS4wNTctMi41ODIgNS41MTUtNy4yNzkuMDk0LS45NjguMDktMi4zMTguMDktMi41OFYuNTAxaDYuOTQxdjE4LjM5YzAgMi4xNDUtLjA2IDIuOTQ3LS4xMTUgMy4zNHpNNTUuNCA0MS41NjVjLjI4Ny03LjA5IDYuMjQ5LTExLjk3MyAxNS40NzMtMTEuOTczaDI0Ljc5MWMuMzQyIDAgLjQyOC4yMTEuMjM0LjU2Ni0uOTAyIDEuNjc0LTMuODA4IDYuNDk2LTcuNDA3IDYuNDk2aC0xNC40M2MtNy45NzIgMC0xMy4zMTIgNC4yMzUtMTQuODM5IDguNTg4LS4yNzcuNzk1LTEuMDYyIDIuNjg1LTIuMTk3IDIuNjg1LTEuNTUxIDAtMS44LTIuMDQ0LTEuNjI1LTYuMzYyem0tMTQuNzk4IDBjLjE3MyA0LjMxOC0uMDcyIDYuMzYyLTEuNjI3IDYuMzYyLTEuMTM1IDAtMS45MTctMS44OS0yLjE5NS0yLjY4NS0xLjUzLTQuMzUzLTYuODY4LTguNTg4LTE0LjgzOC04LjU4OEg3LjUwOWMtMy41OTcgMC02LjUwNy00LjgyMi03LjQwOS02LjQ5Ni0uMTkxLS4zNTUtLjEwNi0uNTY2LjIzNi0uNTY2aDI0Ljc5MmM5LjIyMyAwIDE1LjE4NyA0Ljg4MyAxNS40NzQgMTEuOTczek00OCA1Ni4yNWM1LjE5MSAwIDEwLjQwMy0yLjY3MSAxMi41ODQtNS41ODQgMi43MDMtMy42MTMgMy4xOTItMTAuMTc1IDE1LjI5NC0xMC4xNzVoMTAuNjg1Yy4zNDIgMCAuNDMuMjE2LjIzNi41NjgtLjkwMiAxLjY3NS00LjIyNSA3LjAxOS03LjgyNSA3LjAxOWgtNC45NzJjLTIuNjg1IDAtMy4zMTEgMS43OTEtNC42MDIgMy44OTlDNjUuNiA1OS4xMzcgNTguMSA2NCA0OCA2NGMtMTAuMDk5IDAtMTcuNi00Ljg2NC0yMS40LTEyLjAyMy0xLjI5LTIuMTA4LTEuOTE4LTMuOS00LjYwMi0zLjloLTQuOTczYy0zLjU5OSAwLTYuOTIzLTUuMzQzLTcuODI1LTcuMDE4LS4xOS0uMzUyLS4xMDYtLjU2OC4yMzUtLjU2OGgxMC42ODdjMTIuMTAyIDAgMTIuNTkgNi41NjIgMTUuMjk0IDEwLjE3NUM0OS41OTYgNTMuNTc5IDQ2LjgxIDU2LjI1IDUyIDU2LjI1em0yLjQ3NC01NC44NTd2NC40MjVzLTMuNTk3LTEuNy02LjMxNS0xLjdjLTIuNzEgMC00Ljc2Ljk0LTQuNzYgMi44ODUgMCAyLjQxNiA0LjYxNSAzLjU1NCA2LjMxMSA0LjEyOSAxLjY5Ni41NzQgNi43MTMgMi43MjYgNi43MTMgNy4xMDMgMCA0LjY0My0yLjYxOCA4LjkwMi0xMS42OTYgOC45MDItNC43OCAwLTcuNTEyLTEuNDQ0LTcuNTEyLTEuNDQ0di00LjM3N2MxLjU4LjU3OCA1LjEyOSAxLjQ0NSA2Ljk1NyAxLjQ0NSAzLjExIDAgNC45ODYtLjY1NSA0Ljk4Ni0yLjYxMyAwLTIuNDg0LTQuODc1LTMuOC02Ljc1Ni00LjU1NC0xLjg4My0uNzU2LTYuMjA1LTIuNTQxLTYuMjA1LTcuNjJDMzIuMTk4IDIuMzE2IDM3LjQwNiAwIDQzLjYwNiAwYzQuMjEyIDAgNi44NyAxLjM5MyA2Ljg3IDEuMzkzeiIgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIj48L3BhdGg+PC9zdmc+",
    alt: "SJ",
    website: "https://sj.se"
  },
  {
    name: "Skandia",
    logo: "data:image/svg+xml,%3Csvg viewBox='0 0 794 142' width='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23008f72' d='M273 109H261c-8 0-14-5-14-11 0-8 7-11 14-11h12V109ZM498 107h-4c-19 0-27-9-27-25 0-17 9-25 27-25h4V107ZM94 101c0-39-57-29-57-42 0-5 3-5 20-5 10 0 20 1 31 2V33c-12-2-24-2-36-2C20 31 0 39 0 60c0 38 57 28 57 41 0 4-3 6-20 6 -13 0-26-1-38-2v26c11 2 29 2 43 2C70 132 94 124 94 101M213 130l-40-52 35-45h-38l-23 31c-1 2-4 2-8 2V0h-34v130h34V89c3 0 7 0 8 2l28 38H213ZM314 130c-4-5-6-9-6-15V65c0-31-27-34-51-34 -12 0-23 1-35 2v23c9-1 19-2 29-2 15 0 22 3 22 9v4h-11c-27 0-50 8-50 31 0 24 14 35 33 35 14 0 22-2 29-10 1 3 2 5 4 8H314ZM421 130V66c0-16-6-35-34-35 -12 0-22 5-27 10 -1-3-3-5-5-8h-35c4 5 6 9 6 15v82h34V56h12c12 0 15 6 15 16v58H421ZM538 130c-4-5-6-9-6-15V0h-34v33h-9c-38 0-56 21-56 48 0 31 15 51 39 51 13 0 21-3 26-10 1 3 3 5 5 8H538ZM587 33h-34v97h34V33ZM587 0h-34v22h34V0ZM701 130c-4-5-6-9-6-15V65c0-31-27-34-51-34 -12 0-23 1-35 2v23c9-1 19-2 29-2 15 0 22 3 22 9v4h-11c-27 0-50 8-50 31 0 24 14 35 33 35 14 0 22-2 29-10 1 3 2 5 4 8H701ZM660 109h-12c-8 0-14-5-14-11 0-8 7-11 14-11h12V109Z'%3E%3C/path%3E%3Cpath fill='%23008f72' d='M764 142c-17 0-30-12-30-27 0-15 13-27 30-27 17 0 30 12 30 27C794 130 780 142 764 142M764 73c-17 0-30-12-30-27 0-15 13-27 30-27 17 0 30 12 30 27C794 61 780 73 764 73'%3E%3C/path%3E%3C/svg%3E",
    alt: "Skandia",
    website: "https://skandia.se"
  },
  {
    name: "KTH",
    logo: "https://www.kth.se/img/logotype-blue-ff671d438dd60cb940a663d2fd5e0cf9.svg",
    alt: "KTH Royal Institute of Technology",
    website: "https://kth.se"
  },
  {
    name: "Sveriges Riksbank",
    logo: "https://www.riksbank.se/Content/images/logo-riksbanken.svg",
    alt: "Sveriges Riksbank",
    website: "https://riksbank.se"
  },
  {
    name: "Axfood",
    logo: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='100' height='24' viewBox='0 0 100 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M48.9563953,7.35581395 L45.0581395,7.35581395 L45.0581395,6.42267442 C45.0581395,4.25697674 46.1575581,3.75755814 47.6238372,3.75755814 L49.8226744,3.75755814 L49.8226744,0.0255813953 L47.1238372,0.0255813953 C42.8261628,0.0255813953 40.7267442,2.69186047 40.7267442,6.38953488 L40.7267442,7.35581395 L33.097093,7.35581395 L30.3982558,11.2098837 L27.6994186,7.35523256 L22.5686047,7.35523256 L33.7674419,23.3488372 L38.8982558,23.3488372 L32.7645349,14.5889535 L37.8284884,7.35639535 L37.8284884,11.0877907 L40.7273256,11.0877907 L40.7273256,23.3494186 L45.0587209,23.3494186 L45.0587209,11.0872093 L48.9569767,11.0872093 L48.9569767,7.35581395 M8.22965116,13.8860465 L11.3284884,5.49011628 L14.3598837,13.8860465 L8.22965116,13.8860465 Z M22.3662791,22.680814 L13.7936047,0.35872093 L8.82906977,0.35872093 L0,23.3488372 L4.73139535,23.3488372 L6.69651163,18.0511628 L15.8593023,18.0511628 L17.7581395,23.3488372 L26.6302326,23.3488372 L30.1988372,18.252907 L25.4674419,18.252907 L22.3662791,22.6802326 L22.3662791,22.680814 Z M56.9127907,19.6831395 C54.2802326,19.6831395 52.7476744,17.6174419 52.7476744,15.3186047 C52.7476744,13.0197674 54.2802326,11.0209302 56.9122093,11.0209302 C59.544186,11.0209302 61.0773256,13.0197674 61.0773256,15.3186047 C61.0773256,17.6174419 59.544186,19.6831395 56.9122093,19.6831395 L56.9127907,19.6831395 Z M56.9127907,7.02267442 C52.1476744,7.02267442 48.5831395,10.7540698 48.5831395,15.3523256 C48.5831395,19.95 52.1476744,23.6813953 56.9122093,23.6813953 C61.6767442,23.6813953 65.2418605,19.95 65.2418605,15.3523256 C65.2418605,10.7540698 61.6767442,7.02267442 56.9122093,7.02267442 L56.9127907,7.02267442 Z M74.3639535,19.6831395 C71.7319767,19.6831395 70.1988372,17.6174419 70.1988372,15.3186047 C70.1988372,13.0197674 71.7319767,11.0209302 74.3639535,11.0209302 C76.9959302,11.0209302 78.5284884,13.0197674 78.5284884,15.3186047 C78.5284884,17.6174419 76.9959302,19.6831395 74.3639535,19.6831395 L74.3639535,19.6831395 Z M74.3639535,7.02267442 C69.5994186,7.02267442 66.0343023,10.7540698 66.0343023,15.3523256 C66.0343023,19.95 69.5994186,23.6813953 74.3639535,23.6813953 C79.1284884,23.6813953 82.6930233,19.95 82.6930233,15.3523256 C82.6930233,10.7540698 79.1284884,7.02267442 74.3639535,7.02267442 Z M91.8151163,19.9831395 C89.3831395,19.9831395 87.6837209,18.2837209 87.6837209,15.1854651 C87.6837209,12.2534884 89.4831395,10.5877907 91.8151163,10.5877907 C94.0145349,10.5877907 95.8133721,12.1203488 95.8133721,15.1186047 C95.8133721,18.2837209 94.0145349,19.9831395 91.8151163,19.9831395 L91.8151163,19.9831395 Z M95.5802326,0.0255813953 L95.5802326,9.02151163 C95.1139535,8.08895349 93.8145349,7.02267442 91.0825581,7.02267442 C86.5843023,7.02267442 83.4860465,10.5540698 83.4860465,15.2517442 C83.4860465,20.15 86.6843023,23.6819767 91.1825581,23.6819767 C93.2813953,23.6819767 94.8802326,22.7488372 95.5802326,21.5825581 L95.747093,23.3482558 L99.9116279,23.3482558 L99.9116279,0.0255813953 L95.5802326,0.0255813953 L95.5802326,0.0255813953 Z' fill='%23000' fill-rule='nonzero'/%3E%3C/svg%3E",
    alt: "Axfood",
    website: "https://axfood.se"
  },
  {
    name: "NOVA Consulting",
    logo: "https://www.novaconsultinggroup.se/view-resources/dachser2/public/novaconsultinggroup/nova_2.svg",
    alt: "NOVA Consulting Group",
    website: "https://www.novaconsultinggroup.se"
  },
  {
    name: "Adlibris",
    logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMwIiBoZWlnaHQ9IjMzIiB2aWV3Qm94PSIwIDAgMTM2IDMzIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJ0ZXh0LWZpbGwtYnJhbmQiPjxtYXNrIGlkPSJhIiBzdHlsZT0ibWFzay10eXBlOmx1bWluYW5jZSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMSIgd2lkdGg9IjEzNiIgaGVpZ2h0PSIzMCI+PHBhdGggZD0iTTAgMS41MjdoMTM2djI4LjQ3NUgwVjEuNTI3WiIgZmlsbD0iI2ZmZiI+PC9wYXRoPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI2EpIj48cGF0aCBkPSJNNjguMTE0IDIxLjQ5NWMwIDIuNzAyLS45OTEgNC4wODUtMi45MDggNC4wODUtLjkyNSAwLTEuNTItLjI2My0yLjI0Ny0uOTg4VjEzLjUyNGMuNjYtLjYyNiAxLjM4OC0uOTIyIDIuMzEzLS45MjIgMS44NSAwIDIuODQyIDEuMzUgMi44NDIgMy45MnY0Ljk3NFptLS42MjgtMTIuOTc4Yy0yLjExNSAwLTMuNjY4IDEuMDU1LTQuNDYxIDIuOTMyVjMuNzc0aC01LjU1MnYyNS4zNjRoMi40NDZsMi4xNDgtMy4zOTNjLjU2MiAyLjU3IDIuMjggMy45MiA0Ljk1NyAzLjkyIDQuMjYyIDAgNi41NzYtMy43MjMgNi41NzYtMTAuNjA3IDAtNy4wMTYtMi4wNS0xMC41NC02LjExNC0xMC41NFpNNTQuODMgNC42NjNjMCAxLjg0NS0xLjE5IDIuODY2LTMuMzA1IDIuODY2LTIuMTQ4IDAtMy4zMzgtMS4wMi0zLjMzOC0yLjg2NiAwLTEuNzc4IDEuMjIzLTIuOCAzLjMzOC0yLjhzMy4zMDUgMS4wMjIgMy4zMDUgMi44Wk04NS4xOTkgOC41NWMuNDMgMCAuODkyLjAzMyAxLjI1NS4xMzJ2NS42OTljLS40OTUtLjE5OC0xLjE5LS4zMy0xLjg4My0uMzMtMS40MjEgMC0yLjY0NC41Ni0zLjIwNiAxLjQxN3YxMy42N0g3NS44OFY4Ljk0NmgyLjYxbDIuNjQ0IDQuMDUxdi0uMDY2YzAtMi44NjUgMS40MjEtNC4zOCA0LjA2NS00LjM4Wm05LjI4NS0zLjg4N2MwIDEuODQ1LTEuMTU2IDIuODY2LTMuMjcxIDIuODY2LTIuMTQ4IDAtMy4zMzgtMS4wMi0zLjMzOC0yLjg2NiAwLTEuNzc4IDEuMjIzLTIuOCAzLjMzOC0yLjggMi4wODIgMCAzLjI3MiAxLjAyMiAzLjI3MiAyLjhabS02LjA0NyA0LjI4M2g1LjQ4NnYyMC4xOTFoLTUuNDg2VjguOTQ2Wk0zMS4yNjggMjQuNTkyYy0uNzI3LjcyNS0xLjMyMi45ODgtMi4yNDcuOTg4LTEuOTE3IDAtMi45MDgtMS4zODMtMi45MDgtNC4wODR2LTQuOTc0YzAtMi41Ny45OTEtMy45MiAyLjg0Mi0zLjkyLjkyNSAwIDEuNjUyLjI5NiAyLjMxMy45MjJ2MTEuMDY4Wm0tLjA2Ni0xMy4xNDNjLS43OTMtMS44NzctMi4zNDYtMi45MzItNC40NjEtMi45MzItNC4wNjUgMC02LjExNCAzLjUyNS02LjExNCAxMC41NDEgMCA2Ljg4NCAyLjMxNCAxMC42MDcgNi41NzYgMTAuNjA3IDIuNjc3IDAgNC4zOTUtMS4zNSA0Ljk1Ny0zLjkybDIuMTQ4IDMuMzkzaDIuNDQ2VjMuNzc0aC01LjU1MnY3LjY3NVptNzkuNzM5IDExLjgyNWMwIDMuODg3LTIuODA5IDYuMzU4LTcuMjM3IDYuMzU4LTQuNDYgMC03LjQ2OC0yLjA3Ni03Ljg2NS01LjQzNWw0Ljk5LS44OWMuMjMyIDEuNDE3IDEuMjg5IDIuMjczIDIuNzQzIDIuMjczIDEuMzU1IDAgMi4yNDctLjgyMyAyLjI0Ny0yLjA3NSAwLTEuNDE2LTEuMDktMi4zMDYtMy4zMzctMi43MzQtNC40MjgtLjc1OC02LjM0NS0yLjU3LTYuMzQ1LTUuOTk1IDAtMy42OSAzLjAwNy02LjI1OSA3LjM2OS02LjI1OSA0LjE5NyAwIDcuMDM5IDIuMTQyIDcuMzAzIDUuNTAxbC00Ljk5Ljg5Yy0uMDMzLTEuMzg0LS45NTgtMi4zMzktMi4yOC0yLjMzOS0xLjM4OCAwLTIuMjE0LjY5Mi0yLjIxNCAxLjg3NyAwIDEuMTUzLjg1OSAxLjc0NiAzLjUwMyAyLjQwNSA0LjM2MiAxLjA1NCA2LjExMyAyLjg5OSA2LjExMyA2LjQyM1ptLTcwLjkxNi0xOS41aDUuNTE5djI1LjM2NGgtNS41MTlWMy43NzRaTTcuNzQgMjAuMzc2bDEuNjItNi41ODguNTk1LTMuMjk0LjU5NCAzLjI5NCAxLjQ1NCA2LjU4OEg3Ljc0Wk02LjgxNCA2LjA4TC4yMDUgMjkuMTM4aDUuMjg3bDEuMTktNC40OGg2LjM0NWwxLjA5IDQuNDhoNi4wMTVMMTMuOTg1IDYuMDhoLTcuMTdaTTQ4Ljc1IDguOTQ2aDUuNDg2djIwLjE5MWgtNS40ODZWOC45NDZabTgzLjY3OSA5LjI4NGE4LjQwNCA4LjQwNCAwIDAgMC01Ljg5MSAyLjM5OCA4LjQwNCA4LjQwNCAwIDAgMC01Ljg5MS0yLjM5OFY1LjY1YzIuMjkzIDAgNC4zNzMuOTE0IDUuODkxIDIuMzk4YTguNDAzIDguNDAzIDAgMCAxIDUuODkxLTIuMzk4VjE4LjIzWk0xMTcuMjc5IDIuMjkydjE4LjQ1Nmw4LjQxNiA4LjM5aDEuNjg0bDguNDE2LTguMzlWMi4yOTJoLTE4LjUxNloiIGZpbGw9IiNENjBEMEQiPjwvcGF0aD48L2c+PC9zdmc+",
    alt: "Adlibris",
    website: "https://adlibris.com"
  },
  {
    name: "Cisco",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/2560px-Cisco_logo_blue_2016.svg.png",
    alt: "Cisco",
    website: "https://cisco.com"
  },
  {
    name: "Walmart",
    logo: "https://i5.walmartimages.com/dfw/63fd9f59-14e2/9d304ce6-96de-4331-b8ec-c5191226d378/v1/spark-icon.svg",
    alt: "Walmart",
    website: "https://walmart.com"
  },
  {
    name: "Mars",
    logo: "https://www.mars.com/themes/custom/mars_acss/assets/images/logo-main.svg",
    alt: "Mars",
    website: "https://mars.com"
  },
  {
    name: "Valtech",
    logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTkiIGhlaWdodD0iMzYiIGZpbGw9Im5vbmUiIGFyaWEtbGFiZWxsZWRieT0ibG9nby10aXRsZSI+PGcgZmlsbD0iY3VycmVudENvbG9yIiBjbGlwLXBhdGg9InVybCgjY2xpcDBfMzM4XzEyNTE3KSI+PHBhdGggZD0iTTE1OC40NTYgMTYuODU1aC0xNS40NzNMMTUzLjkyNiA2LjA4bC0xLjY0Ni0xLjYyLTEwLjk0MiAxMC43NzRWMGgtMi4zMjd2MTUuMjM1TDEyOC4wNjggNC40NmwtMS42NDUgMS42MiAxMC45NDIgMTAuNzc0aC0xNS40NzN2Mi4yOWgxNS40NzNMMTI2LjQyMyAyOS45MmwxLjY0NSAxLjYyIDEwLjk0My0xMC43NzRWMzZoMi4zMjdWMjAuNzY1TDE1Mi4yOCAzMS41NGwxLjY0Ni0xLjYyLTEwLjk0My0xMC43NzRoMTUuNDczdi0yLjI5Wm0tMTguMjgyIDIuMjlBMS4xNTYgMS4xNTYgMCAwIDEgMTM5LjAxMSAxOGMwLS42MzIuNTIyLTEuMTQ1IDEuMTYzLTEuMTQ1LjY0MiAwIDEuMTY0LjUxMyAxLjE2NCAxLjE0NXMtLjUyMiAxLjE0NS0xLjE2NCAxLjE0NVpNMTkuNzQ1IDguMTc5bC04LjYxIDIyLjkwOUg4LjY0M0wwIDguMTc4aDIuNTZsNy4zNDYgMjAuMTkzTDE3LjIxOCA4LjE4aDIuNTI3Wk0yNy4xNzQgMTIuNjk5Yy00LjU4NyAwLTcuMjggMi4zNTYtNy41NDYgNi4yMThoMi4zMjdjLjMtMi43NSAyLjMyNy00LjIyMiA1LjIxOS00LjIyMiAyLjY1OSAwIDQuNDU0IDEuMjQ0IDQuNDU0IDMuMzM4IDAgMS40NC0uOTY0IDIuMjkxLTMuODIzIDIuMjkxaC0yLjA2Yy00LjQyMiAwLTYuODE1IDIuMDYyLTYuODE1IDUuNDk4IDAgMy42OTggMi42OTMgNS42NjIgNi4yNSA1LjY2MiAzLjEyNCAwIDUuNzUtMS41NyA2LjY4LTQuNDV2NC4wNThoMi4xOTRWMTguNjIyYzAtMy40Ny0yLjE5My01LjkyNC02Ljg4LTUuOTI0Wm00LjU1NCAxMC4wMTRjMCA0LjcxMy0zLjAyNSA2LjgwNy02LjE1IDYuODA3LTIuOTU4IDAtNC4yMjEtMS44MzItNC4yMjEtMy42OTggMC0xLjczNCAxLjEzLTMuNTM0IDQuNDU0LTMuNTM0aDEuNTk2YzIuNDkyIDAgMy44ODktLjc1MyA0LjI4OC0yLjA5NWguMDMzdjIuNTJaTTM4LjI5MyA0LjkwNmgyLjMyN3YyNi4xODVoLTIuMzI3VjQuOTA2Wk00OS4wNjMgMTUuMDUxdjEwLjkzMWMwIDEuOTk3LjgzIDMuMTQyIDIuNTI2IDMuMTQyaDEuNzk1djEuOTY0aC0yLjEyN2MtMi45OTIgMC00LjUyMS0xLjcwMi00LjUyMS00LjgxMVYxNS4wNUg0My4wOHYtMS45NjNoMy42NTZ2LTQuOTFoMi4zMjd2NC45MWg0LjMyMXYxLjk2M2gtNC4zMjFaTTcyLjU5NyAyMi43NzVINTcuODM4Yy4yMzMgNC4xODkgMi43OTIgNi43MDkgNi4zMTYgNi43MDkgMi43OTIgMCA0Ljk4Ni0xLjU3MSA1LjgxNy0zLjkyOGgyLjQ2Yy0uNzY1IDMuNDM3LTMuOTkgNS45MjQtOC4yNzcgNS45MjQtNS4yNTIgMC04LjgwOS0zLjczLTguODA5LTkuMzkzIDAtNS42NjIgMy42MjMtOS4zOTIgOC44MDktOS4zOTIgNC44NTMgMCA4LjQ0MyAzLjU2NyA4LjQ0MyA4LjI4djEuOFptLTE0Ljc1OS0yLjAzaDEyLjM5OWMtLjI2Ni0zLjUzNC0yLjU5My02LjA1NC02LjA4My02LjA1NHMtNi4wODMgMi42ODQtNi4zMTYgNi4wNTRaTTc0LjkyNCAyMi4wNTVjMC01LjUzMSAzLjM1Ny05LjM2IDguOTc1LTkuMzYgNS4xMTkgMCA3Ljk0NCAzLjI3MiA4LjM0MyA3LjI2NWgtMi40NmMtLjIzMi0yLjgxNS0yLjI5My01LjI3LTUuODgzLTUuMjctNC4wNTYgMC02LjUxNSAzLjA0NS02LjUxNSA3LjM2NSAwIDQuNTQ5IDIuODI1IDcuNDI5IDYuNTE1IDcuNDI5IDMuNjkgMCA1LjU1LTIuNjg0IDUuODgzLTQuOTFoMi40NmMtLjQ5OSAzLjYzMy0zLjM5IDYuOTA2LTguMzQzIDYuOTA2LTUuMzUyIDAtOC45NzUtMy43My04Ljk3NS05LjQyNVpNOTUuNSA0LjkwNmgyLjMyNnY5LjIzYzAgLjgxNyAwIDEuNDQtLjA2NiAyLjY1aC4wNjZjLjkzMS0xLjk5NiAyLjg1OS00LjA5IDYuMTUtNC4wOSAzLjkyMiAwIDYuMzE1IDIuNzQ4IDYuMzE1IDcuMDM2djExLjM1NmgtMi4zMjZWMjAuMDI2YzAtMy41NjctMS44MjktNS4zMDItNC40ODgtNS4zMDItMi45NTggMC01LjY1IDIuMTYtNS42NSA2LjIxOHYxMC4xNDZoLTIuMzI4VjQuOTA2WiIvPjwvZz48L3N2Zz4=",
    alt: "Valtech",
    website: "https://valtech.com"
  },
  {
    name: "Uppsala Universitet",
    logo: "https://www.uu.se/images/18.17dda5f1791cdbd287d9b55/1622452923523/uu-logo-red.svg",
    alt: "Uppsala Universitet",
    website: "https://uu.se"
  },
  {
    name: "Dorian Collective",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQHBosOYvu3f7A/company-logo_200_200/B4DZjhwCgOHsAM-/0/1756134123926?e=2147483647&v=beta&t=q1JW3oBKvmsqFf6iC21a5ruJUXKmvaNM_kn9okUng4Q",
    alt: "Dorian Collective",
    website: "https://doriancollective.com"
  },
  {
    name: "AstraZeneca",
    logo: "data:image/png;base64,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",
    alt: "AstraZeneca",
    website: "https://astrazeneca.com"
  },
  {
    name: "Procter & Gamble",
    logo: "https://images.ctfassets.net/oggad6svuzkv/7znyJc3Y7SecEoKSYKWoaQ/4a24e9015c360799cfb072adcd92cc5e/P_G_Logo_RGB.svg",
    alt: "Procter & Gamble",
    website: "https://pg.com"
  },
  {
    name: "Securitas",
    logo: "https://www.securitasdirect.se/sites/sd-se/files/flmngr/Examples/securitas-direct-white.png",
    alt: "Securitas",
    website: "https://securitas.com"
  }
];

// Mac Window Component with Typing Animation
const MacWindow = () => {
  const [windowState, setWindowState] = useState<'minimized' | 'normal' | 'maximized'>('normal');
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [showConsoleOutput, setShowConsoleOutput] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const windowRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMotionPreference();

  // Code lines to type out
  const codeLines = useMemo(() => [
    "const fetchAvailableConsultants = async () => {",
    "  const response = await fetch('/api/consultants', {",
    "    method: 'GET',",
    "    headers: { 'Content-Type': 'application/json' }",
    "  });",
    "",
    "  if (!response.ok) {",
    "    throw new Error('Failed to fetch consultants');",
    "  }",
    "",
    "  return await response.json();",
    "};",
    "",
    "// Let's see who's available for your project",
    "const consultants = await fetchAvailableConsultants();",
    "console.log(consultants);"
  ], []);

  // Mock JSON response to show after typing
  const jsonResponse = {
    success: true,
    data: {
      "niklas": "senior front-end developer and accessibility expert",
      "robert": "full-stack developer and AI specialist/engineer", 
      "andreas": "full-stack developer and accessibility certified professional",
      "lucas": "DevOps engineer and AI specialist/cloud"
    },
    total: 5,
    available: 4,
    expertise: ["React", "TypeScript", "Node.js", "AI/ML", "Accessibility", "Cloud", "Mobile"],
    responseTime: "147ms"
  };

  // Typing animation logic - simplified approach
  const startTyping = useCallback(() => {
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    
    const intervalId = setInterval(() => {
      const currentLineText = codeLines[currentLineIndex] || '';
      
      if (currentCharIndex >= currentLineText.length) {
        // Move to next line
        currentLineIndex++;
        currentCharIndex = 0;
        
        if (currentLineIndex >= codeLines.length) {
          // All lines complete
          clearInterval(intervalId);
          setCurrentLine(currentLineIndex - 1);
          setCurrentChar(codeLines[currentLineIndex - 1]?.length || 0);
          
          setTimeout(() => {
            setTypingComplete(true);
            setTimeout(() => {
              setShowConsoleOutput(true);
            }, 500);
          }, 500);
          return;
        }
        
        setCurrentLine(currentLineIndex);
        setCurrentChar(0);
      } else {
        // Type next character
        currentCharIndex++;
        setCurrentLine(currentLineIndex);
        setCurrentChar(currentCharIndex);
      }
    }, 30);
  }, [codeLines]);

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const currentRef = windowRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          // Delay to create the "opening from dock" effect
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
            // Start typing after window animation completes
            setTimeout(() => {
              if (!prefersReducedMotion) {
                startTyping();
              } else {
                // Show all content immediately if reduced motion
                setCurrentLine(codeLines.length - 1);
                setCurrentChar(codeLines[codeLines.length - 1].length);
                setTypingComplete(true);
                setShowConsoleOutput(true);
              }
            }, 700); // Wait for window animation to complete
          }, 200);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated, prefersReducedMotion, startTyping, codeLines]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
      setWindowState('normal');
    }, 2000);
  };

  const handleMinimize = () => {
    setWindowState('minimized');
    setTimeout(() => {
      setWindowState('normal');
    }, 2000);
  };

  const handleMaximize = () => {
    if (windowState === 'maximized') {
      setWindowState('normal');
    } else {
      setWindowState('maximized');
    }
  };

  // Render typed content
  const renderTypedContent = () => {
    return codeLines.map((line, lineIndex) => {
      if (lineIndex < currentLine) {
        // Fully typed lines
        return (
          <div key={lineIndex} className="text-gray-300">
            {renderSyntaxHighlighting(line)}
          </div>
        );
      } else if (lineIndex === currentLine) {
        // Currently typing line
        const visibleText = line.substring(0, currentChar);
        return (
          <div key={lineIndex} className="text-gray-300">
            {renderSyntaxHighlighting(visibleText)}
            <span className="animate-pulse bg-emerald-400 w-2 h-4 inline-block ml-0.5"></span>
          </div>
        );
      }
      return null;
    });
  };

  // Simple syntax highlighting with proper JSX elements
  const renderSyntaxHighlighting = (text: string) => {
    // Handle empty lines
    if (!text.trim()) {
      return <span>&nbsp;</span>;
    }

    // Split text into tokens and apply highlighting
    let key = 0;

    // Process the text character by character to maintain proper highlighting
    const processText = (str: string): JSX.Element[] => {
      const result: JSX.Element[] = [];
      let i = 0;
      
      while (i < str.length) {
        // Check for keywords
        if (/\b(const|await|async|return|if|throw|new)\b/.test(str.slice(i))) {
          const match = str.slice(i).match(/\b(const|await|async|return|if|throw|new)\b/);
          if (match && match.index === 0) {
            result.push(<span key={key++} className="text-blue-300">{match[0]}</span>);
            i += match[0].length;
            continue;
          }
        }
        
        // Check for built-in functions
        if (/\b(fetch|Error|response|json|console|log)\b/.test(str.slice(i))) {
          const match = str.slice(i).match(/\b(fetch|Error|response|json|console|log)\b/);
          if (match && match.index === 0) {
            result.push(<span key={key++} className="text-yellow-300">{match[0]}</span>);
            i += match[0].length;
            continue;
          }
        }
        
        // Check for strings
        if (str[i] === "'" || str[i] === '"') {
          const quote = str[i];
          let j = i + 1;
          while (j < str.length && str[j] !== quote) {
            j++;
          }
          if (j < str.length) {
            j++; // Include closing quote
            result.push(<span key={key++} className="text-green-400">{str.slice(i, j)}</span>);
            i = j;
            continue;
          }
        }
        
        // Check for comments
        if (str.slice(i, i + 2) === '//') {
          result.push(<span key={key++} className="text-gray-500">{str.slice(i)}</span>);
          break;
        }
        
        // Regular character
        result.push(<span key={key++} className="text-gray-300">{str[i]}</span>);
        i++;
      }
      
      return result;
    };

    return <span>{processText(text)}</span>;
  };

  return (
    <div ref={windowRef} className="relative min-h-[300px] flex items-center justify-center">
      {/* Initial dock icon before animation */}
      {!isVisible && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className={`w-16 h-16 bg-gray-800 rounded-xl shadow-lg border border-gray-600 flex items-center justify-center ${
            prefersReducedMotion ? '' : 'animate-pulse'
          }`}>
            <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
          </div>
          <div className="text-center mt-2 text-xs text-gray-500 dark:text-gray-400">
            Terminal
          </div>
        </div>
      )}

      {/* Mac Window */}
      <div 
        className={`
          bg-gray-900 dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-700 overflow-hidden
          font-mono text-sm transform-gpu transition-all duration-500 ease-in-out
          ${!isVisible 
            ? 'scale-0 opacity-0 translate-y-32' 
            : windowState === 'minimized' 
              ? 'scale-50 opacity-50 translate-y-32' 
              : windowState === 'maximized' 
                ? 'scale-100 opacity-100 translate-y-0 w-full max-w-full relative shadow-3xl' 
                : 'scale-100 opacity-100 translate-y-0 w-[85%] sm:w-[540px] max-w-xl relative'
          }
          ${!prefersReducedMotion && isVisible ? 'animate-in slide-in-from-bottom-8 fade-in duration-700' : ''}
        `}
      >
        {/* Window Title Bar */}
        <div className="bg-gray-800 dark:bg-gray-700 px-4 py-3 flex items-center justify-between border-b border-gray-600">
          <div className="flex items-center gap-2">
            {/* Traffic Light Controls */}
            <button
              onClick={handleClose}
              className={`w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors duration-200 flex items-center justify-center group aspect-square ${
                prefersReducedMotion ? '' : 'hover:scale-110'
              }`}
              title="Close"
            >
              <X className="w-2 h-2 text-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={handleMinimize}
              className={`w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors duration-200 flex items-center justify-center group aspect-square ${
                prefersReducedMotion ? '' : 'hover:scale-110'
              }`}
              title="Minimize"
            >
              <Minus className="w-2 h-2 text-yellow-800 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={handleMaximize}
              className={`w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors duration-200 flex items-center justify-center group aspect-square ${
                prefersReducedMotion ? '' : 'hover:scale-110'
              }`}
              title={windowState === 'maximized' ? 'Restore Window' : 'Maximize Window'}
            >
              <div className={`transition-transform duration-200 ${windowState === 'maximized' ? 'rotate-45' : ''}`}>
                <Plus className="w-2 h-2 text-green-800 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          </div>
          <div className="text-gray-400 text-xs font-medium">
            {windowState === 'maximized' ? 'fetchConsultants.js — Maximized' : 'fetchConsultants.js'}
          </div>
          <div className="w-12"></div> {/* Spacer for balance */}
        </div>

        {/* Window Content */}
        <div className="p-4 bg-gray-900 dark:bg-gray-800 font-mono text-sm min-h-[300px]">
          <div className="space-y-1">
            {renderTypedContent()}
            
            {/* Show console output after typing is complete */}
            {typingComplete && (
              <div className="mt-4">
                {/* Console.log output simulation */}
                <div className={`transition-all duration-500 ease-in-out transform ${showConsoleOutput ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                  <div className="text-gray-300 text-sm mb-2">
                    <pre className="whitespace-pre-wrap text-gray-400">{JSON.stringify(jsonResponse, null, 2)}</pre>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-3 text-gray-500 text-xs">
              {showConsoleOutput 
                ? '// Console output displayed ✓'
                : typingComplete 
                ? '// Function executed, loading output...'
                : '// Typing in progress...'
              }
            </div>
          </div>
        </div>

        {/* Bottom resize handle (visual only) */}
        <div className="h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-30"></div>
      </div>

      {/* Dock icon when minimized (visual effect) */}
      {windowState === 'minimized' && isVisible && (
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
          <div className={`w-12 h-12 bg-gray-800 rounded-lg shadow-lg border border-gray-600 flex items-center justify-center ${
            prefersReducedMotion ? '' : 'animate-bounce'
          }`}>
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
          </div>
          <div className="text-center mt-1 text-xs text-gray-500 dark:text-gray-400">
            Terminal
          </div>
        </div>
      )}
    </div>
  );
};

const ClientShowcase = () => {
  const prefersReducedMotion = useMotionPreference();
  const [isPaused, setIsPaused] = useState(false);

  // Auto-pause marquee if user prefers reduced motion
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsPaused(true);
    }
  }, [prefersReducedMotion]);

  return (
    <section className="py-16 bg-gray-50 dark:bg-custom-dark transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Trusted by Industry Leaders
            </h2>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-custom-dark-lighter shadow-md hover:shadow-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                prefersReducedMotion ? '' : 'transition-shadow duration-200'
              } ${prefersReducedMotion ? 'ring-2 ring-amber-400' : ''}`}
              aria-label={`${isPaused || prefersReducedMotion ? "Enable" : "Disable"} marquee animation${prefersReducedMotion ? ' (currently using scrollbar due to motion preference)' : isPaused ? ' (currently using scrollbar)' : ''}`}
              title={
                prefersReducedMotion 
                  ? "Motion reduced - using horizontal scrollbar. Click to enable animation." 
                  : isPaused 
                    ? "Animation paused - using horizontal scrollbar. Click to enable animation."
                    : "Animation active. Click to pause and show scrollbar."
              }
            >
              {isPaused || prefersReducedMotion ? (
                <Play className="w-4 h-4 ml-0.5" />
              ) : (
                <Pause className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Leading the Way with Experience and Dedication That Earns Your Trust
          </p>
        </div>
        
        <div className="relative">
          {(isPaused || prefersReducedMotion) ? (
            // Static horizontal scroll version for paused/reduced motion
            <div 
              className="overflow-x-auto py-8 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500"
              role="region"
              aria-label="Company logos - scroll horizontally to view all"
            >
              <div className="flex gap-6 w-max px-6">
                {clients.map((client, index) => (
                  <div 
                    key={index}
                    className="flex-shrink-0"
                  >
                    <div 
                      className={`w-24 h-24 rounded-lg border-2 border-gray-200 dark:border-custom-dark bg-white dark:bg-custom-dark-lighter shadow-md flex items-center justify-center grayscale hover:grayscale-0 hover:border-emerald-300 dark:hover:border-emerald-500 ${
                        // Make specific logos have less padding if they appear too small
                        ['KTH', 'Sveriges Riksbank', 'PostNord', 'Axfood', 'Valtech', 'Dorian Collective', 'Skandia', 'Mars', 'Adlibris', 'Uppsala Universitet'].includes(client.name) 
                          ? 'p-2' 
                          : 'p-4'
                      } ${
                        prefersReducedMotion ? '' : 'transition-all duration-300'
                      }`}
                      role="img"
                      aria-label={`${client.name} logo`}
                    >
                      <img
                        src={client.logo}
                        alt=""
                        aria-hidden="true"
                        className={`object-contain ${
                          // Make Valtech logo largest
                          client.name === 'Valtech' || client.name === 'Uppsala Universitet'|| client.name === 'AstraZeneca'
                            ? 'w-17 h-17'
                            : // Make specific logos larger if they appear too small
                              ['KTH', 'Sveriges Riksbank', 'PostNord', 'Axfood', 'Dorian Collective', 'AstraZeneca', 'Skandia', 'Mars', 'Adlibris', 'Uppsala Universitet'].includes(client.name) 
                              ? 'w-14 h-14' 
                              : 'w-12 h-12'
                        }`}
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Animated marquee version
            <Marquee className="relative overflow-hidden py-8">
              <div className="absolute top-0 bottom-0 left-0 z-10 h-full w-24 bg-gradient-to-r from-white dark:from-[rgb(21,22,24)] to-transparent" />
              <div className="absolute top-0 bottom-0 right-0 z-10 h-full w-24 bg-gradient-to-l from-white dark:from-[rgb(21,22,24)] to-transparent" />
              <MarqueeContent 
                pauseOnHover={!isPaused} 
                autoFill 
                play={!isPaused}
                className="[--duration:45s]"
              >
                {clients.map((client, index) => (
                  <MarqueeItem key={index} className="mx-6">
                    <div 
                      className={`w-24 h-24 rounded-lg border-2 border-gray-200 dark:border-custom-dark bg-white dark:bg-custom-dark-lighter shadow-md flex items-center justify-center grayscale hover:grayscale-0 hover:border-emerald-300 dark:hover:border-emerald-500 ${
                        // Make specific logos have less padding if they appear too small
                        ['KTH', 'Sveriges Riksbank', 'PostNord', 'Axfood', 'Valtech', 'Dorian Collective', 'AstraZeneca', 'Skandia', 'Mars', 'Adlibris', 'Uppsala Universitet'].includes(client.name) 
                          ? 'p-2' 
                          : 'p-4'
                      } ${
                        prefersReducedMotion ? '' : 'transition-all duration-300'
                      }`}
                      role="img"
                      aria-label={`${client.name} logo`}
                    >
                      <img
                        src={client.logo}
                        alt=""
                        aria-hidden="true"
                        className={`object-contain ${
                          // Make Valtech logo largest
                          client.name === 'Valtech' || client.name === 'Uppsala Universitet'|| client.name === 'AstraZeneca'
                            ? 'w-17 h-17'
                            : // Make specific logos larger if they appear too small
                              ['KTH', 'Sveriges Riksbank', 'PostNord', 'Axfood', 'Dorian Collective', 'Skandia', 'Mars', 'Adlibris', 'Uppsala Universitet'].includes(client.name) 
                              ? 'w-14 h-14' 
                              : 'w-12 h-12'
                        }`}
                        loading="lazy"
                      />
                    </div>
                  </MarqueeItem>
                ))}
              </MarqueeContent>
            </Marquee>
          )}
        </div>
        
        <div className="text-center mt-8">
          {(isPaused || prefersReducedMotion) && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              💡 Scroll horizontally to view all company logos
            </p>
          )}
          <div className="flex items-center justify-center gap-4">
            <div className="relative">
              {/* Enhanced Mac Window */}
              <MacWindow />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientShowcase;