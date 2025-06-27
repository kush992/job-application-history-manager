import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CheckCircle, Mail } from "lucide-react"
import Link from "next/link"

export default function ConfirmPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-xl font-semibold text-gray-900">Email Confirmed!</CardTitle>
            <CardDescription>Your email address has been successfully verified</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-green-200 bg-green-50">
              <Mail className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                Your account is now active. You can sign in and start using the application.
              </AlertDescription>
            </Alert>

            <Link href="/auth/signin" className="block">
              <Button className="w-full">Continue to Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
