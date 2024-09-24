'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, Settings } from 'lucide-react'
import BlurIn from './magicui/blur-in'

interface Props {
  name: string,
  appMoto: string,
  accBal: number,
  avatarUrl?: string
}

function Header({ name, appMoto, accBal, avatarUrl }: Props) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase()

  return (
    <Card className="w-full bg-white z-10">
      <CardContent className="p-6">
        <div className="flex justify-between items-center gap-5 bg-white">
          <div className="flex items-center space-x-4 bg-white">
            <Avatar>
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-xl font-semibold z-10">
                Welcome, <BlurIn word={name} className='text-sm font-bold text-black' duration={0.5}/>
              </div>
              <p className="text-sm text-muted-foreground">{appMoto}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Account Balance</p>
              <p className="text-lg font-semibold">${accBal.toFixed(2)}</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Header