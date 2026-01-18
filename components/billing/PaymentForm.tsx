'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  CreditCard,
  Calendar,
  Lock,
  CheckCircle2,
  Shield,
  Eye,
  EyeOff,
  Banknote,
  Wallet,
  Smartphone
} from 'lucide-react';

export default function PaymentForm() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [saveCard, setSaveCard] = useState(true);
  const [showCvc, setShowCvc] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + (v.length > 2 ? '/' + v.substring(2, 4) : '');
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiry(formatExpiry(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Processing payment...');
    // In production, this would call Stripe API
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-cyan-500">
            <CreditCard className="w-3 h-3 mr-1" />
            Secure Payment
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Payment Information</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Securely add your payment details. All transactions are encrypted.
          </p>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Choose your preferred payment method</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Payment Method Selection */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <Button
                variant={paymentMethod === 'card' ? 'default' : 'outline'}
                className="flex-col h-auto py-4"
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard className="w-6 h-6 mb-2" />
                <span>Card</span>
              </Button>
              <Button
                variant={paymentMethod === 'paypal' ? 'default' : 'outline'}
                className="flex-col h-auto py-4"
                onClick={() => setPaymentMethod('paypal')}
              >
                <Banknote className="w-6 h-6 mb-2" />
                <span>PayPal</span>
              </Button>
              <Button
                variant={paymentMethod === 'wallet' ? 'default' : 'outline'}
                className="flex-col h-auto py-4"
                onClick={() => setPaymentMethod('wallet')}
              >
                <Wallet className="w-6 h-6 mb-2" />
                <span>Wallet</span>
              </Button>
            </div>

            {paymentMethod === 'card' ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Card Number */}
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="cardNumber"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      className="pl-10"
                      maxLength={19}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Expiry Date */}
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="expiry"
                        value={expiry}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        className="pl-10"
                        maxLength={5}
                      />
                    </div>
                  </div>

                  {/* CVC */}
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="cvc"
                        type={showCvc ? "text" : "password"}
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                        placeholder="123"
                        className="pl-10 pr-10"
                        maxLength={4}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowCvc(!showCvc)}
                      >
                        {showCvc ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Cardholder Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Cardholder Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Smith"
                  />
                </div>

                {/* Save Card Toggle */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Save card for future payments</p>
                    <p className="text-sm text-gray-600">Your card details will be securely stored</p>
                  </div>
                  <Switch checked={saveCard} onCheckedChange={setSaveCard} />
                </div>

                {/* Security Badges */}
                <div className="flex items-center justify-center gap-6 py-4 border-t">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-sm">256-bit SSL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">PCI Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-600" />
                    <span className="text-sm">Verified</span>
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" size="lg">
                  Pay Now
                </Button>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  {paymentMethod === 'paypal' ? (
                    <Banknote className="w-10 h-10 text-white" />
                  ) : (
                    <Smartphone className="w-10 h-10 text-white" />
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {paymentMethod === 'paypal' ? 'PayPal Payment' : 'Digital Wallet'}
                </h3>
                <p className="text-gray-600 mb-6">
                  You will be redirected to complete your payment securely
                </p>
                <Button className="w-full" size="lg">
                  Continue to {paymentMethod === 'paypal' ? 'PayPal' : 'Wallet'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Professional Plan</span>
                <span className="font-medium">$79.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">$7.90</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium text-green-600">-$15.80</span>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>$71.10</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Charged monthly, cancel anytime</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}