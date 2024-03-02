'use client'
import React, { useState } from 'react'

const PurchaseTable = ({
  results,
}: {
  results: { c: string; t: string }[]
}) => {
  const stocks = results
  const monthlyPayment = 30

  const totalShares = stocks.reduce(
    (_previousValue: number, currentValue: { c: string; t: string }) => {
      const shareValue = currentValue.c
      return _previousValue + monthlyPayment / Number(shareValue)
    },
    0
  )

  const moneySpent = stocks.length * monthlyPayment

  return (
    <div>
      <div className="mt-9 rounded-xl border w-[300px]">
        <div className="flex justify-between p-4  ">
          {/* <h4>Monthly Payment - $30</h4> */}
        </div>
        <div className="flex justify-between p-4 border-b ">
          <div>Date - Price</div>
          <div></div>
          <div>Shares Bought</div>
        </div>
        {stocks.map((stock) => {
          const shareValue = Number(stock.c)
          const purchasedShare = monthlyPayment / Number(shareValue)
          const date = new Date(stock.t)
          const year = date.getUTCFullYear()
          const month = date.getUTCMonth() + 1
          const day = date.getUTCDate()

          const withSlashes = [year, month, day].join('/')
          return (
            <div key={stock.t} className="flex justify-between p-4 border-b ">
              <div>
                {withSlashes} - {shareValue}
              </div>
              <div></div>
              <div>{purchasedShare.toFixed(2)}</div>
            </div>
          )
        })}

        <div className="flex justify-between w-full p-4">
          <h4>Total Shares: </h4>
          <h4>{totalShares.toFixed(2)}</h4>
        </div>
        <div className="flex justify-between w-full p-4">
          <h4>Money Spent: </h4>
          <h4>${moneySpent}</h4>
        </div>
        <div className="flex justify-between w-full p-4">
          <h4>Money Made: </h4>
          <h4>
            {' '}
            ${(totalShares * Number(stocks[stocks.length - 1].c)).toFixed(2)}
          </h4>
        </div>
      </div>
    </div>
  )
}

export default PurchaseTable
