import { useState } from "react";
import { CreditCard, Smartphone, MapPin, Lock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface PaymentMethodsProps {
  amount: string;
  onPaymentComplete: () => void;
  onCancel: () => void;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  type: "mobile" | "card" | "bank";
  countries: string[];
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "unitel",
    name: "UNITEL Money",
    icon: Smartphone,
    description: "Pagamento via UNITEL Money",
    type: "mobile",
    countries: ["AO"] // Angola
  },
  {
    id: "visa",
    name: "VISA",
    icon: CreditCard,
    description: "Cartão de crédito ou débito VISA",
    type: "card",
    countries: ["AO", "BR", "PT", "US", "MZ"] // Múltiplos países
  },
  {
    id: "mastercard",
    name: "Mastercard",
    icon: CreditCard,
    description: "Cartão de crédito ou débito Mastercard",
    type: "card",
    countries: ["AO", "BR", "PT", "US", "MZ"]
  },
  {
    id: "mpesa",
    name: "M-Pesa",
    icon: Smartphone,
    description: "Pagamento móvel M-Pesa",
    type: "mobile",
    countries: ["MZ"] // Moçambique
  }
];

const countries = [
  { code: "AO", name: "Angola", currency: "AOA", symbol: "Kz" },
  { code: "BR", name: "Brasil", currency: "BRL", symbol: "R$" },
  { code: "PT", name: "Portugal", currency: "EUR", symbol: "€" },
  { code: "MZ", name: "Moçambique", currency: "MZN", symbol: "MT" },
  { code: "US", name: "Estados Unidos", currency: "USD", symbol: "$" }
];

export function PaymentMethods({ amount, onPaymentComplete, onCancel }: PaymentMethodsProps) {
  const [selectedCountry, setSelectedCountry] = useState("AO");
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedCountryData = countries.find(c => c.code === selectedCountry);
  const availableMethods = paymentMethods.filter(method => 
    method.countries.includes(selectedCountry)
  );
  const selectedMethodData = paymentMethods.find(m => m.id === selectedMethod);

  const formatAmount = (value: string) => {
    if (!selectedCountryData || !value) return "";
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "";
    
    return `${selectedCountryData.symbol} ${numValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const handlePayment = async () => {
    if (!selectedMethod) return;
    
    setIsProcessing(true);
    
    // Simular processamento do pagamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    onPaymentComplete();
  };

  const isFormValid = () => {
    if (!selectedMethod) return false;
    
    if (selectedMethodData?.type === "card") {
      return cardData.number && cardData.expiry && cardData.cvv && cardData.name;
    }
    
    if (selectedMethodData?.type === "mobile") {
      return phoneNumber.length >= 9;
    }
    
    return true;
  };

  return (
    <div className="space-y-6">
      {/* Seleção de País */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <Label>País/Região</Label>
        </div>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.name} ({country.symbol})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Resumo do Valor */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Valor da doação:</span>
            <span className="text-lg font-semibold">{formatAmount(amount)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Métodos de Pagamento */}
      <div className="space-y-3">
        <Label>Método de Pagamento</Label>
        <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
          <div className="grid gap-3">
            {availableMethods.map((method) => {
              const Icon = method.icon;
              return (
                <Card 
                  key={method.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedMethod === method.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value={method.id} />
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{method.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {method.type === "mobile" ? "Móvel" : 
                             method.type === "card" ? "Cartão" : "Banco"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </RadioGroup>
      </div>

      {/* Formulário de Dados do Pagamento */}
      {selectedMethodData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Dados do Pagamento
            </CardTitle>
            <CardDescription>
              Informações seguras e criptografadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedMethodData.type === "card" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="cardName">Nome no Cartão</Label>
                  <Input
                    id="cardName"
                    placeholder="Nome completo"
                    value={cardData.name}
                    onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Número do Cartão</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.number}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
                      if (value.length <= 19) {
                        setCardData(prev => ({ ...prev, number: value }));
                      }
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Validade</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/AA"
                      value={cardData.expiry}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 4) {
                          const formatted = value.replace(/(\d{2})(\d{0,2})/, '$1/$2').replace(/\/$/, '');
                          setCardData(prev => ({ ...prev, expiry: formatted }));
                        }
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      type="password"
                      value={cardData.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 4) {
                          setCardData(prev => ({ ...prev, cvv: value }));
                        }
                      }}
                    />
                  </div>
                </div>
              </>
            )}

            {selectedMethodData.type === "mobile" && (
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Número de Telefone {selectedMethodData.name}
                </Label>
                <Input
                  id="phone"
                  placeholder={selectedCountry === "AO" ? "+244 9XX XXX XXX" : "Número do telefone"}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Você receberá uma notificação para confirmar o pagamento
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Segurança */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Lock className="h-4 w-4" />
        <span>Todos os dados são protegidos com criptografia SSL</span>
      </div>

      <Separator />

      {/* Botões de Ação */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Cancelar
        </Button>
        <Button 
          onClick={handlePayment} 
          disabled={!isFormValid() || isProcessing}
          className="flex-1"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Processando...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Confirmar Pagamento
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}