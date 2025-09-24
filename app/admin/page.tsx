import { Bell, List, ChevronUp, ChevronDown, MessageCircle, Star, Pencil, MoreVertical, Pin, Ellipsis, Link, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import SideBar from '@/components/admin/SideBar'

import CardStat from '@/components/admin/cart-starts'
import LineChartSvg from '@/components/admin/Line-chart-svg'

export default function LandingPage(){
  return (
    <div className=" min-h-screen flex  bg-[#f5f6f8]">
      {/* Sidebar */}

        <SideBar/>
      {/* Main Content */}
     
      

      <main className="flex-1 max-w-[1332px] mx-auto p-8 overflow-y-auto">

        
        {/* Welcome Section */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-[#2c2a29] mb-2">Welcome Back, Admin</h1>
          <p className="text-[#666666]">Here's a snapshot of how the platform is performing.</p>
        </section>

        {/* Key Metrics */}
 <section className=' grid grid-cols-1 gap-2 md:grid-cols-12 grid-rows-2'>
  <div className='col-span-2'>
     <CardStat title="Users" value="49,937" subtitle="+1,292 past week" />
  </div>
  <div className="col-span-2">
        <CardStat
          title="Outlets"
          value="3,590"
          subtitle="+10 new this week"
          bgColor="bg-[#ffe4d8]"
          subtitleColor="text-[#dc3f27]"
        />

  </div>
  <div className='col-span-2'>
      <CardStat
          title="Products"
          value="78,093"
          subtitle="+907 this week"
          bgColor="bg-[#dff1ff]"
        />
  </div>
       <div className='col-span-6'>
              <CardStat title="Recently Activity" bgColor="bg-[#e6e7ec]">
          <div className="text-[#808080] text-xs mb-2">10.40 AM, Fri 10 June 2025</div>
          <h3 className="text-[#2c2a29] font-semibold mb-1">Mary N. submitted a new story</h3>
          <p className="text-[#666666] text-sm mb-4">
            Kindly check the requirements and terms of work and make sure everything is right.
          </p>
          <div className="flex justify-between items-center">
            <span className="text-[#808080] text-sm">There have been 12 uploads today</span>
            <Button className="bg-[#2e7d32] text-white hover:bg-[#2c742f] text-sm px-4 py-2 rounded-md">
              See All Activity
            </Button>
          </div>
        </CardStat>
       </div>
          {/* Survey & Newsletter */}
        <div className="col-span-3">
  <CardStat
    title="Survey Participation"
    value="216"
    subtitle="+12% today"
    chart={
      <LineChartSvg
        path="M0 40 Q 25 10, 50 30 T 100 20"
        arrow="95,25 100,20 95,15"
      />
    }
  />
</div>
<div className="col-span-3">
  <CardStat
    title="Newsletter Growth"
    value="16"
    subtitle="+11 today"
    chart={
       <LineChartSvg 
        path="M0 30 Q 25 40, 50 20 T 100 10" 
        arrow="95,15 100,10 95,5" 
      />
    }
  />
</div>
 </section>





     

        {/* Analytics Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#2c2a29] mb-4">Analytics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 bg-white shadow-sm rounded-lg p-6">
              <CardTitle className="text-[#2c2a29] text-lg font-semibold mb-4 flex justify-between items-center">
                Site Visits
                <Button variant="ghost" className="text-[#666666] text-sm">
                  Monthly <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </CardTitle>
              <CardContent className="p-0">
                {/* Placeholder for Site Visits Chart */}
                <div className="h-64 w-full flex items-center justify-center bg-white rounded-lg">
                  <svg viewBox="0 0 600 200" className="w-full h-full">
                    {/* Y-axis labels */}
                    <text x="0" y="10" fontSize="12" fill="#808080">
                      100k
                    </text>
                    <text x="0" y="60" fontSize="12" fill="#808080">
                      50k
                    </text>
                    <text x="0" y="110" fontSize="12" fill="#808080">
                      20k
                    </text>
                    <text x="0" y="160" fontSize="12" fill="#808080">
                      10k
                    </text>
                    <text x="0" y="190" fontSize="12" fill="#808080">
                      0
                    </text>

                    {/* X-axis labels */}
                    <text x="50" y="195" fontSize="12" fill="#808080" textAnchor="middle">
                      May
                    </text>
                    <text x="150" y="195" fontSize="12" fill="#808080" textAnchor="middle">
                      June
                    </text>
                    <text x="250" y="195" fontSize="12" fill="#808080" textAnchor="middle">
                      July
                    </text>
                    <text x="350" y="195" fontSize="12" fill="#808080" textAnchor="middle">
                      Aug
                    </text>
                    <text x="450" y="195" fontSize="12" fill="#808080" textAnchor="middle">
                      Sept
                    </text>
                    <text x="550" y="195" fontSize="12" fill="#808080" textAnchor="middle">
                      Oct
                    </text>
                    <text x="650" y="195" fontSize="12" fill="#808080" textAnchor="middle">
                      Nov
                    </text>
                    <text x="750" y="195" fontSize="12" fill="#808080" textAnchor="middle">
                      Dec
                    </text>

                    {/* Grid lines */}
                    <line x1="40" y1="10" x2="780" y2="10" stroke="#e6e6e6" strokeDasharray="2 2" />
                    <line x1="40" y1="60" x2="780" y2="60" stroke="#e6e6e6" strokeDasharray="2 2" />
                    <line x1="40" y1="110" x2="780" y2="110" stroke="#e6e6e6" strokeDasharray="2 2" />
                    <line x1="40" y1="160" x2="780" y2="160" stroke="#e6e6e6" strokeDasharray="2 2" />

                    {/* Example path data (adjust points to match screenshot) */}
                    <path
                      d="M40 160 L140 140 L240 100 L340 60 L440 120 L540 100 L640 80 L740 60"
                      fill="none"
                      stroke="#6bbf6f"
                      strokeWidth="2"
                    />
                    <path
                      d="M40 160 L140 140 L240 100 L340 60 L440 120 L540 100 L640 80 L740 60 L740 190 L40 190 Z"
                      fill="#6bbf6f"
                      fillOpacity="0.2"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 gap-6">
              <Card className="bg-white shadow-sm rounded-lg p-6">
                <CardTitle className="text-[#666666] text-sm font-normal mb-2">Top Performing Month</CardTitle>
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-[#2e7d32] mb-1">November</div>
                  <div className="text-[#666666] text-sm">4,598 Submissions</div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm rounded-lg p-6">
                <CardTitle className="text-[#666666] text-sm font-normal mb-2">Top Performing Product</CardTitle>
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-[#2e7d32] mb-1">Maize</div>
                  <div className="text-[#666666] text-sm">96K Tons sold so far</div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm rounded-lg p-6">
                <CardTitle className="text-[#666666] text-sm font-normal mb-2">Top buyer</CardTitle>
                <CardContent className="p-0 flex items-center space-x-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Maggie Johnson" />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-[#2c2a29]">Maggie Johnson</div>
                    <div className="text-[#666666] text-sm">Oasis Organic Inc.</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Top Performing Stories */}
        <section className="mb-8">
          <Card className="bg-white shadow-sm rounded-lg p-6">
            <CardTitle className="text-[#2c2a29] text-lg font-semibold mb-4">Top Performing Stories</CardTitle>
            <CardContent className="p-0">
              <ul className="space-y-4">
                <li className="flex items-center space-x-4">
                  <span className="font-bold text-[#2c2a29]">1</span>
                  <ChevronUp className="h-4 w-4 text-[#2e7d32]" />
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Mary Njoroge" />
                    <AvatarFallback>MN</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold text-[#2c2a29]">I Doubled My Income with No Chemicals</div>
                    <div className="text-[#666666] text-sm">Mary Njoroge · 18 June 2025</div>
                  </div>
                </li>
                <li className="flex items-center space-x-4 bg-[#f8f8f8] p-3 rounded-lg border border-[#e6e6e6]">
                  <span className="font-bold text-[#2c2a29]">2</span>
                  <ChevronDown className="h-4 w-4 text-[#dc3f27]" />
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Youth Rooftop" />
                    <AvatarFallback>YR</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold text-[#2c2a29]">Youth Rooftop</div>
                    <div className="text-[#2c742f] text-sm">Farming in Nairobi</div>
                    <div className="text-[#666666] text-sm">Young & Green · 13 July 2025</div>
                  </div>
                  <div className="flex space-x-2 text-[#808080]">
                    <MessageCircle className="h-4 w-4" />
                    <Star className="h-4 w-4" />
                    <Pencil className="h-4 w-4" />
                    <MoreVertical className="h-4 w-4" />
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <span className="font-bold text-[#2c2a29]">3</span>
                  <ChevronUp className="h-4 w-4 text-[#2e7d32]" />
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Fatuma's Journey" />
                    <AvatarFallback>FJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold text-[#2c2a29]">"Agroecology Changed My Life"</div>
                    <div className="text-[#666666] text-sm">Fatuma's Journey · 4 July 2025</div>
                  </div>
                </li>
                <li className="flex items-center space-x-4 ml-[4.5rem]">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Beginner's Guide" />
                    <AvatarFallback>BG</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold text-[#2c2a29]">Beginner's Guide to Agroecology</div>
                  </div>
                </li>
              </ul>
              <Button variant="link" className="text-[#2e7d32] mt-4 p-0 h-auto">
                All Stories →
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Resource Management */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#2c2a29] mb-4">Resource Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white shadow-sm rounded-lg p-6">
              <CardTitle className="text-[#2c2a29] text-lg font-semibold mb-4">Recently Uploaded</CardTitle>
              <CardContent className="p-0 space-y-4">
                <div className="bg-[#f8f8f8] p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#2c2a29]">Outing schedule for every departement</div>
                    <div className="text-[#808080] text-sm">5 Minutes ago</div>
                  </div>
                  <div className="flex space-x-2 text-[#808080]">
                    <Pin className="h-4 w-4" />
                    <Ellipsis className="h-4 w-4" />
                  </div>
                </div>
                <div className="bg-[#f8f8f8] p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#2c2a29]">Meeting HR Department</div>
                    <div className="text-[#808080] text-sm">Yesterday, 12:30 PM</div>
                  </div>
                  <div className="flex space-x-2 text-[#808080]">
                    <Pin className="h-4 w-4" />
                    <Ellipsis className="h-4 w-4" />
                  </div>
                </div>
                <div className="bg-[#f8f8f8] p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#2c2a29]">IT Department need two more talents for UX/UI Designer position</div>
                    <div className="text-[#808080] text-sm">Yesterday, 09:15 AM</div>
                  </div>
                  <div className="flex space-x-2 text-[#808080]">
                    <Pin className="h-4 w-4" />
                    <Ellipsis className="h-4 w-4" />
                  </div>
                </div>
                <Button variant="link" className="text-[#2e7d32] p-0 h-auto">
                  View All
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm rounded-lg p-6">
              <CardTitle className="text-[#2c2a29] text-lg font-semibold mb-4">Pending Approval</CardTitle>
              <CardContent className="p-0 space-y-4">
                <div className="text-[#808080] text-sm font-semibold">Priority</div>
                <div className="bg-[#f8f8f8] p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#2c2a29]">Review candidate applications</div>
                    <div className="text-[#808080] text-sm">Today - 11.30 AM</div>
                  </div>
                  <div className="flex space-x-2 text-[#808080]">
                    <Bell className="h-4 w-4" />
                    <Ellipsis className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-[#808080] text-sm font-semibold">Other</div>
                <div className="bg-[#f8f8f8] p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#2c2a29]">Interview with candidates</div>
                    <div className="text-[#808080] text-sm">Today - 10.30 AM</div>
                  </div>
                  <div className="flex space-x-2 text-[#808080]">
                    <Bell className="h-4 w-4" />
                    <Ellipsis className="h-4 w-4" />
                  </div>
                </div>
                <div className="bg-[#f8f8f8] p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#2c2a29]">Short meeting with product designer from IT Departement</div>
                    <div className="text-[#808080] text-sm">Today - 09:15 AM</div>
                  </div>
                  <div className="flex space-x-2 text-[#808080]">
                    <Bell className="h-4 w-4" />
                    <Ellipsis className="h-4 w-4" />
                  </div>
                </div>
                <Button variant="link" className="text-[#2e7d32] p-0 h-auto">
                  View All
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Trending Posts */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-[#2e7d32] shadow-sm rounded-lg p-6 text-white">
            <CardContent className="p-0">
              <div className="text-xs mb-2">10.40 AM, Fri 10 June 2025</div>
              <h3 className="font-semibold mb-1">This Post is trending on Facebook</h3>
              <p className="text-sm mb-4">
                Kindly check the requirements and terms of work and make sure everything is right.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm">There have been 12 uploads today</span>
                <Button className="bg-white text-[#2e7d32] hover:bg-[#f8f8f8] text-sm px-4 py-2 rounded-md">
                  See All Activity
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#2e7d32] shadow-sm rounded-lg p-6 text-white">
            <CardContent className="p-0">
              <div className="text-xs mb-2">10.40 AM, Fri 10 June 2025</div>
              <h3 className="font-semibold mb-1">This Post is trending on Facebook</h3>
              <p className="text-sm mb-4">
                Kindly check the requirements and terms of work and make sure everything is right.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm">There have been 12 uploads today</span>
                <Button className="bg-white text-[#2e7d32] hover:bg-[#f8f8f8] text-sm px-4 py-2 rounded-md">
                  See All Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* All Resources */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#2c2a29] mb-4">All Resources</h2>
          <Card className="bg-white shadow-sm rounded-lg p-6">
            <CardContent className="p-0">
              <div className="flex justify-between items-center mb-4">
                <Tabs defaultValue="news">
                  <TabsList className="bg-[#f8f8f8] rounded-full p-1">
                    <TabsTrigger
                      value="news"
                      className="data-[state=active]:bg-[#2e7d32] data-[state=active]:text-white rounded-full px-4 py-2 text-sm text-[#666666]"
                    >
                      News
                    </TabsTrigger>
                    <TabsTrigger
                      value="stories"
                      className="data-[state=active]:bg-[#2e7d32] data-[state=active]:text-white rounded-full px-4 py-2 text-sm text-[#666666]"
                    >
                      Stories
                    </TabsTrigger>
                    <TabsTrigger
                      value="learning"
                      className="data-[state=active]:bg-[#2e7d32] data-[state=active]:text-white rounded-full px-4 py-2 text-sm text-[#666666]"
                    >
                      Learning
                    </TabsTrigger>
                    <TabsTrigger
                      value="directory"
                      className="data-[state=active]:bg-[#2e7d32] data-[state=active]:text-white rounded-full px-4 py-2 text-sm text-[#666666]"
                    >
                      Directory
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="flex items-center space-x-2">
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="rounded-full border border-[#cccccc] bg-[#f8f8f8] px-4 py-2 text-sm focus:border-[#2e7d32]"
                  />
                  <Button variant="ghost" size="icon" className="bg-[#f8f8f8] rounded-full text-[#666666]">
                    <List className="h-5 w-5" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#f8f8f8] text-[#666666] text-sm">
                    <TableHead className="py-3">Resource Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contributor</TableHead>
                    <TableHead>Target Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  \{[...Array(6)].map((_, i) => (
                    <TableRow key={i} className="border-b border-[#e6e6e6] text-[#2c2a29]">
                      <TableCell className="py-3">John Doe</TableCell>
                      <TableCell>asjsbuwo832yr8747</TableCell>
                      <TableCell>40,908.00</TableCell>
                      <TableCell>20,987.00</TableCell>
                      <TableCell className="text-[#2e7d32]">Closed</TableCell>
                      <TableCell className="flex space-x-2">
                        <Button size="icon" className="bg-[#2e7d32] hover:bg-[#2c742f] text-white h-8 w-8 rounded-md">
                          <Link className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button size="icon" className="bg-[#dc3f27] hover:bg-[#ff0000] text-white h-8 w-8 rounded-md">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-end items-center space-x-2 mt-4">
                <Button variant="ghost" size="icon" className="text-[#666666]">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button size="icon" className="bg-[#2e7d32] text-white h-8 w-8 rounded-full">
                  1
                </Button>
                <Button variant="ghost" size="icon" className="text-[#666666]">
                  2
                </Button>
                <Button variant="ghost" size="icon" className="text-[#666666]">
                  3
                </Button>
                <Button variant="ghost" size="icon" className="text-[#666666]">
                  4
                </Button>
                <Button variant="ghost" size="icon" className="text-[#666666]">
                  5
                </Button>
                <span className="text-[#666666]">...</span>
                <Button variant="ghost" size="icon" className="text-[#666666]">
                  10
                </Button>
                <Button variant="ghost" size="icon" className="text-[#666666]">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      </div>
  
)}


  
