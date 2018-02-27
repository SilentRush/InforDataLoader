using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace InforDataLoader
{
    class ViewModel : INotifyPropertyChanged
    {
        private string _username, _password, _url, _csvFilePath;
        private BindingList<Header> _headerList = new BindingList<Header>();
        public String Username
        {
            set { SetProperty(ref _username, value); }
            get { return _username; }
        }

        public String Password
        {
            set { SetProperty(ref _password, value); }
            get { return _password; }
        }

        public String Url
        {
            set { SetProperty(ref _url, value); }
            get { return _url; }
        }

        public String CsvFilePath
        {
            set { SetProperty(ref _csvFilePath, value); }
            get { return _csvFilePath; }
        }

        public BindingList<Header> HeaderList
        {
            set { SetProperty(ref _headerList, value); }
            get { return _headerList; }
        }


        public event PropertyChangedEventHandler PropertyChanged;
        protected void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChangedEventHandler handler = PropertyChanged;
            if (handler != null)
            {
                handler(this, new PropertyChangedEventArgs(propertyName));
            }
        }

        protected bool SetProperty<T>(ref T storage, T value,
                                      [CallerMemberName] string propertyName = null)
        {
            if (Object.Equals(storage, value))
                return false;

            storage = value;
            OnPropertyChanged(propertyName);
            return true;
        }
    }
}
