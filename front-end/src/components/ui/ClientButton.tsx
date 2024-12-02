"use client";
import React, { ReactNode } from 'react';
import { Button } from "@/src/components/ui/button";

interface props {
  children: ReactNode;
  hello: string;
  age: number;
}

export default function ClientButton({ children }: props) {

    return (
        <Button>{children}</Button>
    );
  };