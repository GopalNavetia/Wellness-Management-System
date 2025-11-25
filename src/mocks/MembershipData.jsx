let mockData = [
    {
        id: '01',
        memberID: '01',
        start_date: '05 Nov 2025',
        end_date: '04 Jan 2026',
        type: 'General',
        fees: '5000'
    },
    {
        id: '02',
        memberID: '02',
        start_date: '01 Sep 2025',
        end_date: '30 Sep 2025',
        type: 'PT',
        fees: '8000'
    },
    {
        id: '03',
        memberID: '03',
        start_date: '15 Nov 2025',
        end_date: '14 Jan 2026',
        type: 'General',
        fees: '5000'
    },
    {
        id: '04',
        memberID: '04',
        start_date: '20 Nov 2025',
        end_date: '19 Jan 2026',
        type: 'PT',
        fees: '8000'
    },
    {
        id: '05',
        memberID: '05',
        start_date: '25 Nov 2025',
        end_date: '24 Jan 2026',
        type: 'General',
        fees: '5000'
    },
    {
        id: '06',
        memberID: '06',
        start_date: '30 Nov 2025',
        end_date: '29 Jan 2026',
        type: 'PT',
        fees: '8000'
    },
    {
        id: '07',
        memberID: '07',
        start_date: '10 Sep 2025',
        end_date: '09 Nov 2025',
        type: 'General',
        fees: '5000'
    },
    {
        id: '08',
        memberID: '08',
        start_date: '10 Dec 2025',
        end_date: '08 Feb 2026',
        type: 'PT',
        fees: '8000'
    },
    {
        id: '09',
        memberID: '09',
        start_date: '15 Dec 2025',
        end_date: '13 Feb 2026',
        type: 'General',
        fees: '5000'
    },
    {
        id: '10',
        memberID: '10',
        start_date: '20 Dec 2025',
        end_date: '18 Feb 2026',
        type: 'PT',
        fees: '8000'
    },
    {
        id: '11',
        memberID: '11',
        start_date: '01 Aug 2025',
        end_date: '31 Aug 2025',
        type: 'General',
        fees: '5000'
    },
    {
        id: '12',
        memberID: '12',
        start_date: '30 Dec 2025',
        end_date: '28 Feb 2026',
        type: 'PT',
        fees: '8000'
    },
    {
        id: '13',
        memberID: '13',
        start_date: '04 Jan 2026',
        end_date: '04 Mar 2026',
        type: 'General',
        fees: '5000'
    },
    {
        id: '14',
        memberID: '14',
        start_date: '09 Jan 2026',
        end_date: '09 Mar 2026',
        type: 'PT',
        fees: '8000'
    },
    {
        id: '15',
        memberID: '15',
        start_date: '14 Jan 2026',
        end_date: '14 Mar 2026',
        type: 'General',
        fees: '5000'
    },
    {
        id: '16',
        memberID: '16',
        start_date: '19 Jan 2026',
        end_date: '19 Mar 2026',
        type: 'PT',
        fees: '8000'
    },
    {
        id: '17',
        memberID: '17',
        start_date: '24 Jan 2026',
        end_date: '24 Mar 2026',
        type: 'General',
        fees: '5000'
    },
    {
        id: '18',
        memberID: '18',
        start_date: '29 Jan 2026',
        end_date: '29 Mar 2026',
        type: 'PT',
        fees: '8000'
    },
    {
        id: '19',
        memberID: '19',
        start_date: '03 Feb 2026',
        end_date: '04 Apr 2026',
        type: 'General',
        fees: '5000'
    },
    {
        id: '20',
        memberID: '20',
        start_date: '08 Feb 2026',
        end_date: '09 Apr 2026',
        type: 'PT',
        fees: '8000'
    },
    {
        id: '21',
        memberID: '21',
        start_date: '13 Feb 2026',
        end_date: '14 Apr 2026',
        type: 'General',
        fees: '5000'
    },
    {
        id: '22',
        memberID: '22',
        start_date: '18 Feb 2026',
        end_date: '19 Apr 2026',
        type: 'PT',
        fees: '8000'
    },
    {
        id: '23',
        memberID: '23',
        start_date: '23 Feb 2026',
        end_date: '24 Apr 2026',
        type: 'General',
        fees: '5000'
    },
    {
        id: '24',
        memberID: '24',
        start_date: '28 Feb 2026',
        end_date: '30 Apr 2026',
        type: 'PT',
        fees: '8000'
    },
    {
        id: '25',
        memberID: '25',
        start_date: '05 Mar 2026',
        end_date: '04 May 2026',
        type: 'General',
        fees: '5000'
    },
    {
        id: '26',
        memberID: '26',
        start_date: '10 Mar 2026',
        end_date: '09 May 2026',
        type: 'PT',
        fees: '8000'
    },
    {
        id: '27',
        memberID: '27',
        start_date: '15 Mar 2026',
        end_date: '14 May 2026',
        type: 'General',
        fees: '5000'
    },
    {
        id: '28',
        memberID: '28',
        start_date: '20 Mar 2026',
        end_date: '19 May 2026',
        type: 'PT',
        fees: '8000'
    },
    {
        id: '29',
        memberID: '29',
        start_date: '25 Mar 2026',
        end_date: '24 May 2026',
        type: 'General',
        fees: '5000'
    },
    {
        id: '30',
        memberID: '30',
        start_date: '30 Mar 2026',
        end_date: '29 May 2026',
        type: 'PT',
        fees: '8000'
    },
    {
        id: '31',
        memberID: '31',
        start_date: '04 Apr 2026',
        end_date: '03 Jun 2026',
        type: 'General',
        fees: '5000'
    },
    {
        id: '32',
        memberID: '32',
        start_date: '09 Apr 2026',
        end_date: '08 Jun 2026',
        type: 'PT',
        fees: '8000'
    },
    {
        id: '33',
        memberID: '33',
        start_date: '14 Apr 2026',
        end_date: '13 Jun 2026',
        type: 'General',
        fees: '5000'
    },
    {
        id: '34',
        memberID: '34',
        start_date: '19 Apr 2026',
        end_date: '18 Jun 2026',
        type: 'PT',
        fees: '8000'
    },
    {
        id: '35',
        memberID: '35',
        start_date: '24 Apr 2026',
        end_date: '23 Jun 2026',
        type: 'General',
        fees: '5000'
    },
    {
        id: '36',
        memberID: '01',
        start_date: '10 Jan 2026',
        end_date: '10 Mar 2026',
        type: 'PT',
        fees: '8200'
    },
    {
        id: '37',
        memberID: '01',
        start_date: '15 Mar 2026',
        end_date: '14 May 2026',
        type: 'General',
        fees: '5200'
    },
    {
        id: '38',
        memberID: '02',
        start_date: '05 Oct 2025',
        end_date: '04 Dec 2025',
        type: 'General',
        fees: '5100'
    },
    {
        id: '39',
        memberID: '02',
        start_date: '20 Dec 2025',
        end_date: '19 Feb 2026',
        type: 'PT',
        fees: '8300'
    },
    {
        id: '40',
        memberID: '05',
        start_date: '01 Mar 2026',
        end_date: '30 May 2026',
        type: 'PT',
        fees: '8000'
    },
    {
        id: '41',
        memberID: '06',
        start_date: '01 Feb 2026',
        end_date: '01 Apr 2026',
        type: 'General',
        fees: '5300'
    },
    {
        id: '42',
        memberID: '10',
        start_date: '01 Mar 2026',
        end_date: '01 May 2026',
        type: 'General',
        fees: '5200'
    },
    {
        id: '43',
        memberID: '10',
        start_date: '10 May 2026',
        end_date: '10 Jul 2026',
        type: 'PT',
        fees: '8000'
    },
    {
        id: '44',
        memberID: '15',
        start_date: '20 Mar 2026',
        end_date: '20 May 2026',
        type: 'PT',
        fees: '8100'
    },
    {
        id: '45',
        memberID: '15',
        start_date: '01 Jun 2026',
        end_date: '31 Jul 2026',
        type: 'General',
        fees: '5400'
    },
    {
        id: '46',
        memberID: '21',
        start_date: '20 Apr 2026',
        end_date: '18 Jun 2026',
        type: 'PT',
        fees: '8200'
    },
    {
        id: '47',
        memberID: '21',
        start_date: '25 Jun 2026',
        end_date: '24 Aug 2026',
        type: 'General',
        fees: '5100'
    },
    {
        id: '48',
        memberID: '30',
        start_date: '10 Jun 2026',
        end_date: '10 Aug 2026',
        type: 'PT',
        fees: '8000'
    },
    {
        id: '49',
        memberID: '30',
        start_date: '15 Aug 2026',
        end_date: '15 Oct 2026',
        type: 'General',
        fees: '5200'
    },
    {
        id: '50',
        memberID: '30',
        start_date: '20 Oct 2026',
        end_date: '20 Dec 2026',
        type: 'PT',
        fees: '8100'
    }
];

export default mockData;