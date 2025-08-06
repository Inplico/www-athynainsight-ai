import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // TODO: Replace with actual Loops API integration
    // For now, just log the data and return success
    console.log('Lead capture data:', data)
    
    // When Loops is set up, this will look something like:
    /*
    const response = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        firstName: data.name.split(' ')[0],
        lastName: data.name.split(' ').slice(1).join(' '),
        userGroup: data.userType,
        company: data.company,
        companySize: data.companySize,
        mailingLists: data.mailingLists,
      }),
    })
    
    if (!response.ok) {
      throw new Error('Failed to add contact to Loops')
    }
    */
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error capturing lead:', error)
    return NextResponse.json(
      { error: 'Failed to capture lead' },
      { status: 500 }
    )
  }
}