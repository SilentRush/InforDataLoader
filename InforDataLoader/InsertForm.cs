using CsvHelper;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace InforDataLoader
{
    public partial class InsertForm : Form
    {
        private ViewModel vm = new ViewModel();

        internal ViewModel Vm
        {
            get
            {
                return vm;
            }

            set
            {
                vm = value;
            }
        }

        public InsertForm()
        {
            InitializeComponent();
        }

        private void InsertForm_Load(object sender, EventArgs e)
        {
            this.csvFilePath.DataBindings.Add(new System.Windows.Forms.Binding("Text", vm, "CsvFilePath", true));
        }

        private void openFileDialog1_FileOk(object sender, CancelEventArgs e)
        {

        }

        private void browseBtn_Click(object sender, EventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            // To list only csv files, we need to add this filter
            openFileDialog.Filter = "|*.csv";
            DialogResult result = openFileDialog.ShowDialog();

            if (result == DialogResult.OK)
            {
                csvFilePath.Text = openFileDialog.FileName;
                using (TextReader reader = File.OpenText(openFileDialog.FileName))
                {
                    var csv = new CsvReader(reader);
                    csv.Read();
                    vm.HeaderList = new BindingList<Header>(csv.Context.Record.Select(x => new Header { CsvHeader = x, EntityHeader = "test" }).ToList<Header>());
                    foreach(var header in vm.HeaderList)
                    {
                        TextBox textBox1 = new TextBox();
                        TextBox textBox2 = new TextBox();
                        textBox1.Text = header.CsvHeader;
                        textBox2.Text = header.EntityHeader;
                        headerPanel.Controls.AddRange(new[] { textBox1, textBox2 });
                    }
                }
            }
        }
    }
}
