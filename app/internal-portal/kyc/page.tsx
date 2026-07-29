'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, AlertCircle, FileCheck, User } from 'lucide-react'

interface KYCDocument {
  id: string
  type: 'pan' | 'aadhaar' | 'passport' | 'driving_license'
  status: 'pending' | 'verified' | 'rejected'
  uploadedDate: string
  verifiedDate?: string
}

interface KYCCase {
  id: string
  name: string
  email: string
  phone: string
  status: 'pending' | 'verified' | 'rejected'
  documents: KYCDocument[]
  kycDate: string
}

const mockKYCCases: KYCCase[] = [
  {
    id: 'kyc1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    status: 'pending',
    kycDate: '2026-07-28T09:00:00Z',
    documents: [
      { id: 'd1', type: 'pan', status: 'verified', uploadedDate: '2026-07-28T08:15:00Z', verifiedDate: '2026-07-28T08:30:00Z' },
      { id: 'd2', type: 'aadhaar', status: 'pending', uploadedDate: '2026-07-28T08:15:00Z' },
    ],
  },
  {
    id: 'kyc2',
    name: 'Neha Gupta',
    email: 'neha.gupta@example.com',
    phone: '+91 98765 54321',
    status: 'pending',
    kycDate: '2026-07-28T10:00:00Z',
    documents: [
      { id: 'd3', type: 'passport', status: 'verified', uploadedDate: '2026-07-28T09:15:00Z', verifiedDate: '2026-07-28T09:25:00Z' },
      { id: 'd4', type: 'aadhaar', status: 'verified', uploadedDate: '2026-07-28T09:15:00Z', verifiedDate: '2026-07-28T09:28:00Z' },
    ],
  },
  {
    id: 'kyc3',
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    phone: '+91 98765 65432',
    status: 'verified',
    kycDate: '2026-07-27T14:00:00Z',
    documents: [
      { id: 'd5', type: 'driving_license', status: 'verified', uploadedDate: '2026-07-27T13:15:00Z', verifiedDate: '2026-07-27T13:30:00Z' },
      { id: 'd6', type: 'aadhaar', status: 'verified', uploadedDate: '2026-07-27T13:15:00Z', verifiedDate: '2026-07-27T13:32:00Z' },
    ],
  },
]

export default function KYCVerificationPage() {
  const [kycCases, setKYCCases] = useState(mockKYCCases)
  const [selectedCase, setSelectedCase] = useState<string | null>(null)
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)

  const selectedCaseData = kycCases.find((c) => c.id === selectedCase)
  const selectedDocData = selectedCaseData?.documents.find((d) => d.id === selectedDocument)

  const handleVerifyDocument = () => {
    setKYCCases(
      kycCases.map((c) => ({
        ...c,
        documents: c.documents.map((d) =>
          d.id === selectedDocument
            ? { ...d, status: 'verified' as const, verifiedDate: new Date().toISOString() }
            : d
        ),
      }))
    )
  }

  const handleCompleteKYC = () => {
    setKYCCases(
      kycCases.map((c) =>
        c.id === selectedCase ? { ...c, status: 'verified' as const } : c
      )
    )
    setSelectedCase(null)
    setSelectedDocument(null)
  }

  const pendingCases = kycCases.filter((c) => c.status === 'pending')
  const verifiedCases = kycCases.filter((c) => c.status === 'verified')

  const getDocumentLabel = (type: string) => {
    const labels: Record<string, string> = {
      pan: 'PAN Card',
      aadhaar: 'Aadhaar',
      passport: 'Passport',
      driving_license: 'Driving License',
    }
    return labels[type] || type
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">KYC Verification</h1>
        <p className="text-muted-foreground">Review and verify customer KYC documents</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 space-y-2">
          <p className="text-sm text-muted-foreground">Total Cases</p>
          <p className="text-3xl font-bold text-foreground">{kycCases.length}</p>
        </Card>
        <Card className="p-4 space-y-2 border-orange-200 bg-orange-50/50 dark:border-orange-900/30 dark:bg-orange-950/20">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-3xl font-bold text-orange-600">{pendingCases.length}</p>
        </Card>
        <Card className="p-4 space-y-2 border-green-200 bg-green-50/50 dark:border-green-900/30 dark:bg-green-950/20">
          <p className="text-sm text-muted-foreground">Verified</p>
          <p className="text-3xl font-bold text-green-600">{verifiedCases.length}</p>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Cases List */}
        <div className="col-span-1">
          <Card className="p-4 space-y-3 max-h-screen overflow-y-auto">
            <p className="text-sm font-semibold text-muted-foreground">KYC Cases</p>

            {kycCases.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No cases</p>
            ) : (
              <div className="space-y-2">
                {kycCases.map((kycCase) => (
                  <button
                    key={kycCase.id}
                    onClick={() => setSelectedCase(kycCase.id)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      selectedCase === kycCase.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-sm text-foreground">{kycCase.name}</p>
                        <p className="text-xs text-muted-foreground">{kycCase.documents.length} documents</p>
                      </div>
                      <Badge
                        className={`text-xs ${
                          kycCase.status === 'verified'
                            ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400'
                            : 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-400'
                        }`}
                      >
                        {kycCase.status}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Case Details */}
        <div className="col-span-2">
          {selectedCaseData ? (
            <div className="space-y-4">
              {/* Header */}
              <Card className="p-6 border-2 border-primary/30 bg-primary/5">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="size-6" />
                      <h2 className="text-2xl font-bold text-foreground">{selectedCaseData.name}</h2>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedCaseData.email}</p>
                    <p className="text-sm text-muted-foreground">{selectedCaseData.phone}</p>
                  </div>
                  <Badge
                    className={`text-xs ${
                      selectedCaseData.status === 'verified'
                        ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400'
                        : 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-400'
                    }`}
                  >
                    {selectedCaseData.status}
                  </Badge>
                </div>
              </Card>

              {/* Documents */}
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <FileCheck className="size-4" />
                  Submitted Documents
                </h3>

                <div className="space-y-2">
                  {selectedCaseData.documents.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => setSelectedDocument(doc.id)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedDocument === doc.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="font-semibold text-sm text-foreground">{getDocumentLabel(doc.type)}</p>
                          <p className="text-xs text-muted-foreground">
                            Uploaded: {new Date(doc.uploadedDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {doc.status === 'verified' ? (
                            <CheckCircle2 className="size-5 text-green-600" />
                          ) : (
                            <AlertCircle className="size-5 text-orange-600" />
                          )}
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              doc.status === 'verified'
                                ? 'border-green-300 text-green-700 dark:border-green-700 dark:text-green-300'
                                : 'border-orange-300 text-orange-700 dark:border-orange-700 dark:text-orange-300'
                            }`}
                          >
                            {doc.status}
                          </Badge>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Document Details */}
              {selectedDocData && (
                <Card className="p-6 space-y-4 border-2 border-primary/20">
                  <h3 className="font-semibold text-foreground">Document Details</h3>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Document Type</p>
                      <p className="text-sm font-semibold text-foreground">{getDocumentLabel(selectedDocData.type)}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Status</p>
                        <Badge className={`mt-1 ${
                          selectedDocData.status === 'verified'
                            ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400'
                            : 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-400'
                        }`}>
                          {selectedDocData.status}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Uploaded</p>
                        <p className="text-sm font-semibold text-foreground">
                          {new Date(selectedDocData.uploadedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {selectedDocData.status === 'pending' && (
                      <Button onClick={handleVerifyDocument} className="w-full gap-2 mt-4">
                        <CheckCircle2 className="size-4" />
                        Verify Document
                      </Button>
                    )}
                  </div>
                </Card>
              )}

              {/* Complete KYC */}
              {selectedCaseData.status === 'pending' &&
                selectedCaseData.documents.every((d) => d.status === 'verified') && (
                  <Button onClick={handleCompleteKYC} className="w-full gap-2 bg-green-600 hover:bg-green-700">
                    <CheckCircle2 className="size-4" />
                    Complete KYC Verification
                  </Button>
                )}
            </div>
          ) : (
            <Card className="p-12 text-center space-y-3">
              <FileCheck className="size-12 text-muted-foreground mx-auto opacity-50" />
              <p className="text-muted-foreground">Select a KYC case to review documents</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
